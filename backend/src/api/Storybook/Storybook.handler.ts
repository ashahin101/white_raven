import { NextFunction, Request, Response } from 'express';
import storybooks from '../../mini-db/dummy-data/storybooks.json';
import { Storybook, StoryId } from '@shared/models/Storybook.model';

const STORYBOOKS: { [K: StoryId]: Storybook } = storybooks;

export function getAll(
  req: Request,
  res: Response<Storybook[]>,
  next: NextFunction,
) {
  try {
    const storybooksArr = Object.values(STORYBOOKS);
    res.json(storybooksArr);
  } catch (error) {
    next(error);
  }
}

export function getById(
  req: Request,
  res: Response<Storybook>,
  next: NextFunction,
) {
  try {
    const id = `${req.params.id || req.query.id}`;
    const storybook = STORYBOOKS[id];
    res.json(storybook);
  } catch (error) {
    next(error);
  }
}
