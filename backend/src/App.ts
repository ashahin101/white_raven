import express, { NextFunction, Request, Response, Application } from 'express';
import storybookRouter from './api/Storybook/Storybook.route.js';
import storyTreeRouter from './api/StoryTree/StoryTree.route.js';
import personalityRouter from './api/Personality/Personality.route.js';
import cors from 'cors';
import canonicalRouter from './api/Canonicals/Canonical.route.js';
import 'dotenv/config';

export class App {
  private app = express();

  startServer(port: number) {
    console.log('FRONTEND_ORIGIN:', process.env.FRONTEND_ORIGIN);
    this.setupCors();
    this.initRoutes();

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.send(err.message);
        next();
      },
    );
    if (port) {
      this.app.listen(port, (error: Error | undefined) => {
        if (error) console.log(error);
        console.log(`Server running on port:${port}`);
      });
    }
  }

  setupCors() {
    // Protect server by only allowing certain origins
    this.app.use(
      cors({
        origin: process.env.FRONTEND_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      }),
    );
  }

  initRoutes() {
    this.app.use('/storybooks', storybookRouter);
    this.app.use('/story_trees', storyTreeRouter);
    this.app.use('/personalities', personalityRouter);
    this.app.use('/canonical', canonicalRouter);
  }

  getExpressApp = (): Application => {
    // For app testing purposes
    this.setupCors();
    this.initRoutes();
    return this.app;
  };
}

const app = new App();
// For testing we need the app without it running a server
export const expressApp = app.getExpressApp();
export default app;
