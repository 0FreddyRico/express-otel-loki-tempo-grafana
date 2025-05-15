import app from "~/app";
import logger from "~/logger";

const port = process.env.PORT || 3242;

app.listen(port, () => {
  logger.info("Server running on port %s", port);
  logger.info("Open http://localhost:%s", port);
});
