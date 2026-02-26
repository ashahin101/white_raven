import express from 'express';

const PORT = 8081;
export class Server {
  private app = express();

  startServer() {
    this.app.listen(PORT, (error) => {
      if (error) console.log(error);
      console.log(`Server running on port:${PORT}`);
    });
  }
}

new Server().startServer();
