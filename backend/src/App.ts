import express, { NextFunction, Request, Response, Application } from 'express';
import storybookRouter from './api/Storybook/Storybook.route.js';
import storyTreeRouter from './api/StoryTree/StoryTree.route.js';
import personalityRouter from './api/Personality/Personality.route.js';
import cors from 'cors';
import canonicalRouter from './api/Canonicals/Canonical.route.js';

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
      this.app.listen(port, (error: Error | undefined) => {
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

  getExpressApp = (): Application => {
    // For app testing purposes
    this.initRoutes();
    return this.app;
  };
}

const app = new App();
// For testing we need the app without it running a server
export const expressApp = app.getExpressApp();
export default app;
