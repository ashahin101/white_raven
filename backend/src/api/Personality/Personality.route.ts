import { json, Router } from 'express';
import * as handlers from './Personality.handler';

const personalityRouter: Router = Router();

personalityRouter.use(json());

personalityRouter.get('/', handlers.getAll);

personalityRouter.get('/:id', handlers.getById);

export default personalityRouter;
