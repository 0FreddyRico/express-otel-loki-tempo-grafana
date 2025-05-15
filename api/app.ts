// app.ts

import "~/otel"; // Always initialize OTEL first

import { context, SpanStatusCode, trace } from "@opentelemetry/api";
import express from "express";
import logger from "~/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware with trace context
app.use((req, res, next) => {
  const span = trace.getSpan(context.active());

  logger.info(
    {
      method: req.method,
      path: req.path,
      traceId: span?.spanContext().traceId,
      spanId: span?.spanContext().spanId,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
      ip:
        req.ip ||
        req.ips ||
        req.socket.remoteAddress ||
        req.connection.remoteAddress,
      hostname: req.hostname,
      protocol: req.protocol,
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
    },
    "API--HIT!",
  );

  next();
});

// Basic routes
app.get("/", (req, res) => {
  res.send("Hello from Express with OpenTelemetry and Pino!");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/error", (req, res) => {
  throw new Error("This is an error");
});

// Global error handler with tracing
app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const tracer = trace.getTracer("express-api");
    const span = tracer.startSpan("api-global-err");

    span.recordException(err as Error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: (err as Error).message,
    });
    span.end();

    logger.fatal(
      {
        err,
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
      },
      "An unknown error occurred!",
    );

    res.status(500).send("Internal Server Error");
  },
);

// 404 handler
app.use((req, res) => {
  const span = trace.getSpan(context.active());
  logger.info(
    {
      path: req.url,
      traceId: span?.spanContext().traceId,
      spanId: span?.spanContext().spanId,
    },
    "Not Found",
  );
  res.status(404).send("Not Found");
});

export default app;
