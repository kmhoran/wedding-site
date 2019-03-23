import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cluster from "cluster";
import os from "os";
import routes from "./routes";

const numCPUs = os.cpus().length;
const WORKER_COUNT = process.env.WEB_CONCURRENCY || 2;
const PORT = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.info(`Node cluster master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < WORKER_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.info(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  // serever
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/api/v1/", routes);
  // remaining requests are sent to the react app
  app.use("/static", express.static(path.join(__dirname, "ui", "static")));
  app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "ui", "index.html"));
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
