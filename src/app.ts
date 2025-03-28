import { createApp } from "@/infra/http/server";

const app = createApp();

app.listen({ port: 3333 }).then(() => {
  console.log('Server running on http://localhost:3333');
});