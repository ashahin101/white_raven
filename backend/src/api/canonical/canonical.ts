import { randomUUID as uuid } from 'crypto';
import {
  StoryTree,
  StoryId,
  Storybook,
  StoryBranch,
  StoryBranchId,
  Canonical,
  TopicNode,
  SceneId,
  StoryNodeOptionKey,
  StoryTopicNodeOption,
  // ChapterId,
  // TopicId,
  // StoryNodeId,
} from '@shared/models';

// Takes in a story tree and storybooks and returns a canonical;
// a normalized data format that maps the story nodes into the story tree scenes
export function canonicalNormalizer(
  tree: StoryTree,
  books: Record<StoryId, Storybook>,
): Canonical {
  // const firstScene = getFirstScene(tree, tree.meta.start);

  const canonical: Canonical = {
    meta: { id: uuid() },
    chapters: {},
    chaptersOrder: [],
    topics: {},
  };

  // const chaptersIdsMap: Map<ChapterId, StoryBranchId> = new Map();
  // const topicsIdsMap: Map<TopicId, StoryNodeId> = new Map();

  const storyTreeId = tree.meta.id;

  // Chapters & Branches level:
  Object.entries(tree.branches).map(
    ([branchId, branchObj]: [StoryBranchId, StoryBranch], branchIndex) => {
      const chapterId = uuid();
      // chaptersIdsMap.set(chapterId, branchId);

      // // Place new chapter ID in the same order of the original branch ID
      // const matchingIndex = tree.branchesOrder.indexOf(branchId);
      // canonical.chaptersOrder[matchingIndex] = chapterId;
      canonical.chaptersOrder = tree.branchesOrder;

      canonical.chapters[branchId] = {
        meta: {
          id: chapterId,
          storyTreeId,
          branchId,
        },
        storyBranch: branchObj,
      };

      // Story Nodes, Scenes & Topics level:
      Object.entries(branchObj.scenes).map(
        ([sceneId, sceneOptions]: [
          sceneId: string,
          sceneOptions: Record<string, SceneId | 'END'>,
        ]) => {
          const [storyName, nodeId] = sceneId.split('::');
          const storybook = books[storyName];
          const storyNode = storybook.nodes[`${storyName}::${nodeId}`];

          const topicId = uuid();
          // topicsIdsMap.set(topicId, nodeId);

          const topic = {
            meta: {
              id: topicId,
              storybookId: storybook.meta.id,
              storyTreeId,
              branchId,
              nodeId,
            },
            // Dangerous use of 'as'
            topicNode: storyNode as TopicNode,
          };

          // Choices & Options level:
          const enhancedStoryNodeOptions: Record<
            StoryNodeOptionKey,
            StoryTopicNodeOption
          > = Object.fromEntries(
            Object.entries(storyNode.options).map(([optionKey, optionObj]) => {
              let target;
              const isChapterEnd = sceneOptions[optionKey] === 'END';

              if (isChapterEnd) {
                const nextChapterId = tree.branchesOrder[branchIndex + 1];
                target =
                  nextChapterId ? tree.branches[nextChapterId].meta.start : '';
              } else {
                target = sceneOptions[optionKey];
              }

              return [
                optionKey,
                {
                  ...optionObj,
                  target,
                  isChapterEnd,
                },
              ];
            }),
          );

          topic.topicNode.options = enhancedStoryNodeOptions;

          canonical.topics[sceneId] = topic;
        },
      );
    },
  );

  return canonical;
}

// // Takes a story tree and a starting point ID
// // and returns related branches (an object of other branches or leafs)
// // - Recursive
// export function getFirstScene(
//   tree: StoryTree,
//   startRoot: SceneId,
// ): { branch: StoryBranch; currentSceneId: SceneId } | undefined {
//   const currentBranch = tree.branches[startRoot];
//   // We reached the final level of the tree (a leaf).
//   if (currentBranch.scenes) {
//     return {
//       currentSceneId: currentBranch.meta.start,
//       branch: currentBranch,
//     };
//   }
//   // Recursively select the next nested tree
//   else {
//     const selectedBranch = currentBranch as unknown as StoryTree;
//     selectStoryStart(selectedBranch, currentBranch.meta.start);
//   }
// }
