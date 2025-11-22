# Zod Validation Bug with Elysia WebSocket

## Running Example

First, install packages:

```bash
bun install
```

To start the development server run:

```bash
bun run dev
```

## Reproducing the Bug

1. Connect any WebSocket client (e.g. Postman) to `ws://localhost:3000/zod`
2. Send an invalid message, for example: { "hello": true }

Expected: WebSocket server should respond with a validation error.

Actual: WebSocket server responds with Echo: {"hello": true}.

## Working validation with Typebox

To see working validation using Typebox, connect to `ws://localhost:3000/typebox` and send the same invalid message. The server will respond with a validation error as expected.
