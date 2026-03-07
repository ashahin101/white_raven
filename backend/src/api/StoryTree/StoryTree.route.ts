import { json, Router } from 'express';
import * as handlers from './StoryTree.handler.js';

const storyTreeRouter: Router = Router();

storyTreeRouter.use(json());

storyTreeRouter.get('/', handlers.getAll);

storyTreeRouter.get('/:id', handlers.getById);

export default storyTreeRouter;
