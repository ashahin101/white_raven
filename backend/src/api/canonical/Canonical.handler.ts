import { NextFunction, Request, Response } from 'express';
import storybooks from '../../mini-db/dummy-data/storybooks.json';
import { Storybook, StoryId } from '@shared/models/Storybook.model';
import story_trees from '../../mini-db/dummy-data/stories_trees.json';
import { StoryTree, StoryTreeId } from '@shared/models/StoryTree.model';
import { Canonical } from '@shared/models/Canonical.model';
import { canonicalNormalizer } from './canonical';
type StoryBooksDict = Record<StoryId, Storybook>;

const STORY_TREES: { [K: StoryTreeId]: StoryTree } = story_trees;
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
