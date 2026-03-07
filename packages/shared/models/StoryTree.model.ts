import { StoryNodeId } from './Storybook.model';

export type StoryTreeId = string;
export type StoryBranchId = string;
// Currently Scenes IDs are using story nodes IDs
export type SceneId = StoryNodeId;

export interface StoryTree {
  meta: {
    type: string | 'StoryTree';
    id: StoryTreeId;
    title: string;
    start: StoryBranchId;
    tags: string[];
    description: string;
  };
  branchesOrder: string[];
  branches: Record<StoryBranchId, StoryBranch>;
}

export interface StoryBranch {
  meta: {
    type: string | 'StoryBranch';
    id: string;
    start: StoryNodeId;
    intro: string;
  };
  scenes: {
    [K: StoryNodeId]: Scene;
  };
  exit?: string;
}

// A scene object holds options;
// each option acts like a reference to another scene ID
export interface Scene {
  [K: string]: SceneId | 'END';
}
