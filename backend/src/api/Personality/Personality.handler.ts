import { NextFunction, Request, Response } from 'express';
import personalities from '../../mini-db/dummy-data/personalities.json';
import { Personality, PersonalityId } from '@shared/models/Personality.modal';

const PERSONALITIES: Personality[] = personalities;

export function getAll(
  req: Request,
  res: Response<Personality[]>,
  next: NextFunction,
) {
  try {
    res.json(PERSONALITIES);
  } catch (error) {
    next(error);
  }
}

export function getById(
  req: Request,
  res: Response<Personality>,
  next: NextFunction,
) {
  try {
    const id: PersonalityId = `${req.params.id || req.query.id}`;
    const storybook = PERSONALITIES.find((el) => el.id === id);
    res.json(storybook);
  } catch (error) {
    next(error);
  }
}
