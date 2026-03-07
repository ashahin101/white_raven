import {
  StoryId,
  StoryNode,
  StoryNodeId,
  StoryNodeOption,
  StoryNodeOptionKey,
} from './Storybook.model';
import { StoryBranch, StoryBranchId, StoryTreeId } from './StoryTree.model';

export type CanonicalId = string;
export type ChapterId = string;
export type TopicId = string;

export interface Canonical {
  meta: { id: CanonicalId };
  chapters: Record<ChapterId, Chapter>;
  chaptersOrder: ChapterId[];
  topics: Record<TopicId, Topic>;
}

// Converted from a branch
export interface Chapter {
  meta: {
    id: ChapterId;
    storyTreeId: StoryTreeId;
    branchId: StoryBranchId;
  };
  storyBranch: StoryBranch;
}

// Converted from a Scene x Story Node
export interface Topic {
  meta: {
    id: TopicId;
    storybookId: StoryId;
    storyTreeId: StoryTreeId;
    branchId: StoryBranchId;
    nodeId: StoryNodeId;
  };
  topicNode: TopicNode;
}

export interface TopicNode extends StoryNode {
  options: Record<StoryNodeOptionKey, StoryTopicNodeOption>;
}

export interface StoryTopicNodeOption extends StoryNodeOption {
  target: TopicId | '';
  isChapterEnd: boolean;
}
