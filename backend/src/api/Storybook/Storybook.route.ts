import { json, Router } from 'express';
import * as handlers from './Storybook.handler.js';

const storybookRouter: Router = Router();

storybookRouter.use(json());

storybookRouter.get('/', handlers.getAll);

storybookRouter.get('/:id', handlers.getById);

export default storybookRouter;
