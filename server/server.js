import express from "express";
import path from "path";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

const PORT = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  // serever
  const app = express();

  const staticFilePath = app.use(express.static(path.resolve(__dirname, "ui")));

  // remaining requests are sent to the react app
  app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "ui", "index.html"));
  });

  app.listen(PORT, function() {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
