import express, { NextFunction, Request, Response } from 'express';
import storybookRouter from './api/Storybook/Storybook.route';
import storyTreeRouter from './api/StoryTree/StoryTree.route';
import personalityRouter from './api/Personality/Personality.route';
import cors from 'cors';
import canonicalRouter from './api/Canonical/Canonical.route';

export class App {
  private app = express();

  startServer(port: number) {
    // Protect server by only allowing certain origins
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      }),
    );

    this.initRoutes();

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.send(err.message);
        next();
      },
    );
    if (port) {
      this.app.listen(port, (error) => {
        if (error) console.log(error);
        console.log(`Server running on port:${port}`);
      });
    }
  }

  initRoutes() {
    this.app.use('/storybooks', storybookRouter);
    this.app.use('/story_trees', storyTreeRouter);
    this.app.use('/personalities', personalityRouter);
    this.app.use('/canonical', canonicalRouter);
  }

  getExpressApp() {
    return this.app;
  }
}

const app = new App();
// For testing we need the app without it running a server
export const expressApp = app.getExpressApp();
export default app;
