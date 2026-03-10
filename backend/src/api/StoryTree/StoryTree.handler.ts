import { NextFunction, Request, Response } from 'express';
import story_trees from '../../mini-db/dummy-data/stories_trees.json';
import { StoryTree, StoryTreeId } from '@shared/models/StoryTree.model';

const STORY_TREES: Record<StoryTreeId, StoryTree> = story_trees;

export function getAll(
  req: Request,
  res: Response<StoryTree[]>,
  next: NextFunction,
) {
  try {
    const storyTreesArr = Object.values(STORY_TREES);
    res.json(storyTreesArr);
  } catch (error) {
    next(error);
  }
}

export function getById(
  req: Request,
  res: Response<StoryTree>,
  next: NextFunction,
) {
  try {
    const id = `${req.params.id || req.query.id}`;
    const storyTree = STORY_TREES[id];
    res.json(storyTree);
  } catch (error) {
    next(error);
  }
}
