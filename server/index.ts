import { createConfiguredApp, log } from "./app.js";

async function isExistingExhibitServer(port: number) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    if (!response.ok) {
      return false;
    }

    const payload = await response.json() as { route?: string; ok?: boolean };
    return payload.ok === true && payload.route === "/api/health";
  } catch {
    return false;
  }
}

async function handleListenError(error: NodeJS.ErrnoException, port: number) {
  if (error.code !== "EADDRINUSE") {
    throw error;
  }

  if (await isExistingExhibitServer(port)) {
    log(`port ${port} is already serving Exhibit at http://127.0.0.1:${port}`);
    process.exit(0);
  }

  log(`port ${port} is already in use by another process`, "express");
  process.exit(1);
}

(async () => {
  const { httpServer } = await createConfiguredApp({ serveClient: true });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  const listenOptions: {
    port: number;
    host: string;
    reusePort?: boolean;
  } = {
    port,
    host: "0.0.0.0",
  };

  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }

  httpServer.on("error", (error: NodeJS.ErrnoException) => {
    void handleListenError(error, port).catch((listenError) => {
      throw listenError;
    });
  });

  httpServer.listen(
    listenOptions,
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
