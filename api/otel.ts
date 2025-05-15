import { Span, SpanStatusCode, trace } from "@opentelemetry/api";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  ExpressInstrumentation,
  ExpressLayerType,
  ExpressRequestInfo,
} from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

// Create the OTLP exporter for Tempo
const exporter = new OTLPTraceExporter({
  url: process.env.OTLP_TRACE_ENDPOINT || "http://tempo:4318/v1/traces",
  // headers: {}, // Add custom headers if Tempo requires authentication
  // timeout: 10000, // Set timeout (in ms) to handle network delays
});

// Define your resource attributes
const resource = resourceFromAttributes({
  [SemanticResourceAttributes.SERVICE_NAME]: "api-express",
  [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
    process.env.NODE_ENV || "development",
});

// Create and configure the OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter: exporter,
  spanProcessor: new BatchSpanProcessor(exporter, {
    maxQueueSize: 100,
    scheduledDelayMillis: 5000,
    exportTimeoutMillis: 30000,
  }),
  instrumentations: [
    // Auto-instrument common Node.js libraries
    getNodeAutoInstrumentations(),

    // Specifically instrument Express
    new ExpressInstrumentation({
      requestHook: function (span: Span, info: ExpressRequestInfo) {
        if (info.layerType === ExpressLayerType.REQUEST_HANDLER) {
          span.setAttribute("http.method", info.request.method);
          span.setAttribute("express.base_url", info.request.baseUrl);
        }
      },
    }),

    // Instrument HTTP requests
    new HttpInstrumentation(),
  ],
  resource,
});

// Initialize the SDK
sdk.start();
console.log("OpenTelemetry SDK started successfully");

// Handle shutdown gracefully
const shutdown = (): void => {
  sdk
    .shutdown()
    .then(() => console.log("OpenTelemetry SDK shut down"))
    .catch((error: Error) =>
      console.error("Error shutting down OpenTelemetry SDK:", error),
    )
    .finally(() => process.exit(0));
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Example of creating a custom span in your application code
export function createCustomSpan<T>(
  name: string,
  fn: () => Promise<T>,
): Promise<T> {
  const tracer = trace.getTracer("express-api");

  return tracer.startActiveSpan(name, async (span: Span) => {
    try {
      const result = await fn();
      span.end();
      return result;
    } catch (error: unknown) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      span.end();
      throw error;
    }
  });
}
