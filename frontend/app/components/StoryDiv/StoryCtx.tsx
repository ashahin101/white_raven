import React, { createContext, useEffect, useState } from 'react';
import {
  type Scene,
  type SceneId,
  type Storybook,
  type StoryBranch,
  type StoryNode,
  type StoryNodeOption,
  type StoryTree,
} from '@shared/models';

const categoriesOrder = ['E/I', 'P/J', 'S/N', 'T/F'] as const;

type Setter<T> = (arg: T) => void;
// type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

interface StoryCtxState {
  // Getters
  storybook: Storybook | null;
  storyTree: StoryTree | null;
  branch: StoryBranch | null;
  storyNode: StoryNode | null;
  scene: Scene | null;
  categoriesOrder: typeof categoriesOrder;
  results: {
    'E/I': string[];
    'P/J': string[];
    'S/N': string[];
    'T/F': string[];
  };
  categoryIndex: number;
  showHintDialog: boolean;
  showBridge: boolean;
  choice: StoryNodeOption | null;
  nextSceneId: SceneId | null;
  // Setter
  setStorybook: Setter<StoryCtxState['storybook']>;
  setStoryTree: Setter<StoryCtxState['storyTree']>;
  setBranch: Setter<StoryCtxState['branch']>;
  setStoryNode: Setter<StoryCtxState['storyNode']>;
  setScene: Setter<StoryCtxState['scene']>;
  setResults: Setter<StoryCtxState['results']>;
  setCategoryIndex: Setter<number>;
  setShowHintDialog: Setter<boolean>;
  setChoice: Setter<StoryCtxState['choice']>;
  setShowBridge: Setter<boolean>;
  setNextSceneId: Setter<StoryCtxState['nextSceneId']>;
  // Actions
  onClickOptionHandler: (
    event: React.MouseEvent<Element, MouseEvent>,
    key: string,
    option: StoryNodeOption,
  ) => void;
  goToScene: (nextSceneId?: SceneId) => void;
}

const initState: StoryCtxState = {
  // Getters
  storybook: {} as unknown as Storybook,
  storyTree: {} as unknown as StoryTree,
  branch: null,
  storyNode: null,
  scene: null,
  results: {
    'E/I': [],
    'P/J': [],
    'S/N': [],
    'T/F': [],
  },
  categoryIndex: 0,
  categoriesOrder,
  showHintDialog: false,
  showBridge: false,
  choice: null,
  nextSceneId: null,
  // Setter
  setStorybook() {},
  setStoryTree() {},
  setBranch() {},
  setStoryNode() {},
  setScene() {},
  setResults() {},
  setCategoryIndex() {},
  setShowHintDialog() {},
  setChoice() {},
  setShowBridge() {},
  setNextSceneId() {},
  // Actions
  onClickOptionHandler(event: Event, key: string, option: StoryNodeOption) {},
  goToScene: (nextSceneId?: StoryCtxState['nextSceneId']) => {},
};

export const StoryCtx = createContext<StoryCtxState>(initState);

export const StoryCtxProvider: React.FC<React.PropsWithChildren> = (props) => {
  //---> state
  // Data
  const [storybook, setStorybook] = useState<StoryCtxState['storybook']>(null);
  const [storyTree, setStoryTree] = useState<StoryCtxState['storyTree']>(null);

  // Key State
  const [branch, setBranch] = useState<StoryCtxState['branch']>(null);
  const [storyNode, setStoryNode] = useState<StoryCtxState['storyNode']>(null);
  const [scene, setScene] = useState<StoryCtxState['scene']>(null);
  const [choice, setChoice] = useState<StoryCtxState['choice']>(null);
  const [nextSceneId, setNextSceneId] =
    useState<StoryCtxState['nextSceneId']>(null);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Accumulative
  const [results, setResults] = useState(initState.results);

  // Flags
  const [showHintDialog, setShowHintDialog] = useState(false);
  const [showBridge, setShowBridge] = useState(false);

  //---> Functions
  //
  const goToScene: StoryCtxState['goToScene'] = (
    nextId = nextSceneId ?? undefined,
  ) => {
    if (nextId === 'END') {
      // handleChapterEnd();
      return;
    }
    // Change selected branch ID to n
    setNextSceneId(nextId ?? null);
  };

  const onClickOptionHandler: StoryCtxState['onClickOptionHandler'] = (
    event,
    key,
    option,
  ) => {
    setChoice(option);

    // Record selected option value, and added it to results
    const selectedCategory = categoriesOrder[categoryIndex];
    setResults((prev) => {
      prev[selectedCategory].push(option.value);
      return prev;
    });

    // Move next scene
    // (nextSceneId e.g., `E3`)
    if (scene) {
      console.log('nextSceneId', nextSceneId);
      if (option.bridge) {
        setShowBridge(true);
        return;
      } else if (nextSceneId) {
        goToScene(nextSceneId);
      }
    }
  };

  //---> Effects
  //
  useEffect(() => {
    if (choice?.key && typeof choice.key === 'string' && scene) {
      setNextSceneId(branch?.scenes?.[scene.id]?.[choice.key] ?? null);
    } else setNextSceneId(null);
  }, [branch, choice]);

  useEffect(() => {
    const fetchDate = async () => {
      await Promise.all(
        [
          { url: 'http://localhost:8081/story_trees/', setter: setStoryTree },
          { url: 'http://localhost:8081/storybooks/', setter: setStorybook },
        ].map(async (reqObj) => {
          const { url, setter } = reqObj;

          const result = await fetch(url, { method: 'GET' });
          const jsonResult = await result.json();

          setter(jsonResult[0]);
        }),
      );
    };
    fetchDate();
  }, []);

  useEffect(() => {
    if (storyTree && storybook) {
      const result = selectStoryStart(
        storyTree,
        nextSceneId ?? storyTree?.meta.start,
      );
      if (result) {
        setBranch(result.branch);
        setStoryNode(storybook?.nodes[result.currentSceneId]);
        setScene(result.branch.scenes[result.currentSceneId]);
      }
    }
  }, [storyTree, storybook, nextSceneId]);

  //   useEffect(() => {
  //   if (storyTree && storybook && nextSceneId) {
  //     const result = selectStoryStart(storyTree, nextSceneId);
  //     if (result) {
  //       setBranch(result.branch);
  //       setStoryNode(storybook?.nodes[result.currentSceneId]);
  //       setScene(result.branch.scenes[result.currentSceneId]);
  //     }
  //   }
  // }, [storyTree, storybook, nextSceneId]);

  //---> Render
  //
  return (
    <StoryCtx.Provider
      value={{
        // Getters
        storybook,
        storyTree,
        branch,
        storyNode,
        scene,
        results,
        categoryIndex,
        categoriesOrder: initState.categoriesOrder,
        showHintDialog,
        showBridge,
        choice,
        nextSceneId,
        // Setter
        setStorybook,
        setStoryTree,
        setBranch,
        setStoryNode,
        setScene,
        setResults,
        setCategoryIndex,
        setShowHintDialog,
        setChoice,
        setShowBridge,
        setNextSceneId,
        // Actions
        onClickOptionHandler,
        goToScene,
      }}
    >
      {props.children}
    </StoryCtx.Provider>
  );
};

// Takes a story tree and a starting point ID
// and returns related branches (an object of other branches or leafs)
function selectStoryStart(
  tree: StoryTree,
  startRoot: SceneId,
): { branch: StoryBranch; currentSceneId: SceneId } | undefined {
  const currentBranch = tree.branches[startRoot];
  // We reached the final level of the tree (a leaf).
  if (currentBranch.scenes) {
    return {
      currentSceneId: currentBranch.meta.start,
      branch: currentBranch,
    };
  }
  // Recursively select the next nested tree
  else {
    const selectedBranch = currentBranch as unknown as StoryTree;
    selectStoryStart(selectedBranch, currentBranch.meta.start);
  }
}
