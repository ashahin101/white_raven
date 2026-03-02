// import storybooks from '../../mini-db/dummy-data/storybooks.json';
// import personalities from '../../mini-db/dummy-data/personalities.json';
// import stories_trees from '../../mini-db/dummy-data/stories_trees.json';
// import { StoryBranch } from '@shared/models/StoryTree.model';
// import { StoryId } from '@shared/models/Storybook.model';

// const storybooksDat = storybooks as unknown as { [K: StoryId]: StoryBranch };
// const personalitiesDat = personalities as unknown as object;
// const storiesTreesDat = stories_trees as unknown as object;

// const tables = {
//   storybooks: storybooksDat,
//   personalities: personalitiesDat,
//   stories_trees: storiesTreesDat,
// };

// export function getAll() {
//   const trees = tables.stories_trees;
//   const books = tables.storybooks;

//   const canonical = createCanonical();

//   return;
// }

// function createCanonical(tree, books) {
//   const startingBranch = selectStoryStart(tree, tree.meta.start);
// }

// // Takes a story tree and a starting point ID
// // and returns related branches (an object of other branches or leafs)
// function selectStoryStart(tree, startRoot) {
//   const currentBranch = tree.branches[startRoot];
//   // We reached the final level of the tree (a leaf).
//   if (currentBranch.scenes) {
//     return {
//       currentSceneId: currentBranch.meta.start,
//       branch: currentBranch,
//     };
//   }
//   // Recursively select the next nested tree
//   else selectStoryStart(currentBranch, currentBranch.meta.start);
// }
