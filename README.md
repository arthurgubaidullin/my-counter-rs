# My Counter

[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/arthurgubaidullin/my-counter-rs)

Here’s the updated documentation in English with additional details:

---

# Getting Started

This guide will help you set up, run, and access the server locally using Docker Compose.

## Starting the Server

To build and run the server in detached mode, execute the following command:

```bash
docker compose up -d --build
```

This command will:

- Build the Docker images if they are not already built or if changes have been made.
- Start the services defined in your `compose.yml` file in the background.

## Stopping the Server

To stop the running services and remove any associated volumes, use:

```bash
docker compose down -v
```

This will:

- Stop all running containers.
- Remove the containers and any associated anonymous volumes to ensure a clean state for the next start.

## Accessing the Server

Once the server is running, you can check it in your browser by navigating to:

[http://localhost:3000](http://localhost:3000)

Replace `localhost` with your server's IP address if you are not running it locally.

---

Let me know if you'd like further refinements!
