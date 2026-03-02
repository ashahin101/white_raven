import express, { NextFunction, Request, Response } from 'express';
import storybookRouter from './api/Storybook/Storybook.route';
import storyTreeRouter from './api/StoryTree/StoryTree.route';
import personalityRouter from './api/Personality/Personality.route';

const PORT = 8081;
export class Server {
  private app = express();

  startServer() {
    // // Protect server by only allowing certain origins
    // this.app.use(function (req: Request, res: Response, next: NextFunction) {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept',
    //   );
    //   next();
    // });

    this.app.use('/storybooks', storybookRouter);
    this.app.use('/story_trees', storyTreeRouter);
    this.app.use('/personalities', personalityRouter);

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.send(err.message);
        next();
      },
    );

    this.app.listen(PORT, (error) => {
      if (error) console.log(error);
      console.log(`Server running on port:${PORT}`);
    });
  }
}

new Server().startServer();
