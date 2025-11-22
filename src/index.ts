import { Elysia, t } from "elysia";
import z from "zod";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .ws("/typebox", {
    query: t.Object({
      token: t.String({ format: "uuid" }),
    }),
    body: t.Object({
      type: t.Literal("test-one"),
      message: t.String(),
    }),
    open(ws) {
      console.log("Connection opened", ws.data.query.token);
    },
    message(ws, message) {
      console.log("Received message:", message);
      ws.send(`Echo: ${JSON.stringify(message)}`);
    },
    close(ws) {
      console.log("Connection closed", ws.data.query.token);
    },
  })
  .ws("/zod", {
    query: z.object({
      token: z.uuidv4(),
    }),
    body: z.object({
      type: z.literal("test-one"),
      message: z.string(),
    }),
    open(ws) {
      console.log("Connection opened", ws.data.query.token);
    },
    message(ws, message) {
      console.log("Received message:", message);
      ws.send(`Echo: ${JSON.stringify(message)}`);
    },
    close(ws) {
      console.log("Connection closed", ws.data.query.token);
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
