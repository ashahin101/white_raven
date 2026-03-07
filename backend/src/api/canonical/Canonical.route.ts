import { json, Router } from 'express';
import * as handlers from './Canonical.handler';

const canonicalRouter = Router();

canonicalRouter.use(json());

canonicalRouter.get('/:storyTreeId', handlers.getByStoryTreeId);

export default canonicalRouter;
