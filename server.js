const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

console.log("Smart Rescue relay started on port 8080");

server.on("connection", (socket) => {
  console.log("A device or website connected");

  socket.on("message", (message) => {
    console.log("Location message:", message.toString());

    // Forward the message to every connected client, including the sender
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("A client disconnected");
  });
});