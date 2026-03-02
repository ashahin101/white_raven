export type StoryId = string;
export type StoryNodeId = string;

type PersonalityCategory = string | 'E/I' | 'P/J' | 'S/N' | 'T/F';

export interface StoryNodeOption {
  value: string;
  storyChoice: string;
  scenery: string;
  bridge: string;
  conclusion: string;
}

export interface StoryNode {
  id: StoryNodeId;
  category: PersonalityCategory;
  question?: string;
  storyline: string;
  scenery: string;
  options: {
    [K: string]: StoryNodeOption;
  };
}

export interface Storybook {
  meta: {
    id: StoryId;
    title: string;
    author: string;
    version: string;
    start: string;
    tags: string[];
    description: string;
  };
  nodes: {
    [K: StoryNodeId]: StoryNode;
  };
}
