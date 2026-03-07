import { NextFunction, Request, Response } from 'express';
import storybooks from '../../mini-db/dummy-data/storybooks.json';
import story_trees from '../../mini-db/dummy-data/stories_trees.json';
import {
  Canonical,
  StoryTree,
  StoryTreeId,
  Storybook,
  StoryId,
} from '@shared/models';
import { canonicalNormalizer } from './canonical';

type StoryBooksDict = Record<StoryId, Storybook>;

const STORY_TREES: Record<StoryTreeId, StoryTree> = story_trees;
const STORYBOOKS: StoryBooksDict = storybooks;

export function getByStoryTreeId(
  req: Request,
  res: Response<Canonical>,
  next: NextFunction,
) {
  try {
    const treeId: StoryTreeId = `${req.params.storyTreeId || req.query.storyTreeId}`;
    const storyTree = STORY_TREES[treeId];
    const canonical = canonicalNormalizer(storyTree, STORYBOOKS);
    res.json(canonical);
  } catch (error) {
    next(error);
  }
}
