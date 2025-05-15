import { context, trace } from "@opentelemetry/api";
import pino from "pino";
import type { LokiOptions } from "pino-loki";

const LokiTransport = pino.transport<LokiOptions>({
  target: "pino-loki",
  options: {
    batching: true,
    interval: 5,
    host: "http://loki:3100",
    // basicAuth: {
    //   username: "username",
    //   password: "password",
    // },
  },
});

const logger = pino(
  {
    mixin() {
      const span = trace.getSpan(context.active());
      if (span) {
        const ctx = span.spanContext();
        return {
          traceId: ctx.traceId,
          spanId: ctx.spanId,
        };
      }
      return {};
    },
  },
  LokiTransport,
);

export default logger;
