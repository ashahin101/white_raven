import type { Personality } from '@shared/models';
import type {
  Canonical,
  Chapter,
  StoryTopicNodeOption,
  Topic,
  TopicId,
} from '@shared/models/Canonical.model';
import { calculateFinalResult } from 'lib/calculateFinalResult';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

const categoriesOrder = ['E/I', 'P/J', 'S/N', 'T/F'] as const;
type Category = (typeof categoriesOrder)[number];
export type ReaderResults = {
  personality: Personality | null;
  results: Record<Category, string[]>;
};

// State
interface StoryState {
  canonical: Canonical | null;
  chapter: Chapter | null;
  topic: Topic | null;
  readerResults: ReaderResults;
  showBridge: boolean;
  showHintDialog: boolean;
  showResults: boolean;
  choice: StoryTopicNodeOption | null;
  loaders: { main: boolean };
}

// Actions
interface StoryActions {
  goToTopic(nextId?: TopicId): void;

  onClickOptionHandler(
    event: React.MouseEvent<Element, MouseEvent>,
    key: string,
    option: StoryTopicNodeOption,
  ): void;

  openHintDialog: () => void;
  closeHintDialog: () => void;
}

// State + Actions + Setters
type StoryCtxState = {
  state: StoryState;
  actions: StoryActions;
  // setCanonical: React.Dispatch<
  //   React.SetStateAction<StoryCtxState['canonical']>
  // >;
  // setChapter: React.Dispatch<React.SetStateAction<StoryCtxState['chapter']>>;
  // setTopic: React.Dispatch<React.SetStateAction<StoryCtxState['topic']>>;
  // setReaderResults: React.Dispatch<React.SetStateAction<ReaderResults>>;
  // setShowBridge: React.Dispatch<
  //   React.SetStateAction<StoryCtxState['showBridge']>
  // >;
  // setShowHintDialog: React.Dispatch<
  //   React.SetStateAction<StoryCtxState['showHintDialog']>
  // >;
  // setChoice: React.Dispatch<React.SetStateAction<StoryCtxState['choice']>>;
};

const StoryCtx = createContext<StoryCtxState | undefined>(undefined);

export function useStoryCtx() {
  const ctx = useContext(StoryCtx);
  if (!ctx) {
    throw new Error('useStoryCtx must be used inside StoryCtxProvider');
  }
  return ctx;
}

const INITIAL_RESULTS: ReaderResults['results'] = {
  'E/I': [],
  'P/J': [],
  'S/N': [],
  'T/F': [],
};

export const StoryCtxProvider = (props: PropsWithChildren) => {
  // Data
  const [canonical, setCanonical] = useState<StoryState['canonical']>(null);
  // Main State
  const [chapter, setChapter] = useState<StoryState['chapter']>(null);
  const [topic, setTopic] = useState<StoryState['topic']>(null);
  const [choice, setChoice] = useState<StoryState['choice']>(null);
  const [readerResults, setReaderResults] = useState<ReaderResults>({
    personality: null,
    results: INITIAL_RESULTS,
  });
  // Flags
  const [showBridge, setShowBridge] = useState<StoryState['showBridge']>(false);
  const [showHintDialog, setShowHintDialog] =
    useState<StoryState['showHintDialog']>(false);
  const [showResults, setShowResults] =
    useState<StoryState['showResults']>(false);

  const [loaders, setLoaders] = useState<StoryState['loaders']>({
    main: true,
  });

  const goToTopic: StoryActions['goToTopic'] = async (
    nextId = choice?.target,
  ) => {
    if (!canonical) return;
    if (!nextId) {
      if (choice?.isChapterEnd) {
        const personality =
          (await calculateFinalResult(readerResults.results)) ?? null;
        setReaderResults((prev) => ({
          ...prev,
          personality,
        }));
        setShowBridge(false);
        setShowResults(true);
      }
    } else {
      console.log('nextId', nextId);
      setTopic(canonical.topics[nextId]);
      setShowBridge(false);
    }
  };

  const onClickOptionHandler: StoryActions['onClickOptionHandler'] = (
    _event,
    _key,
    option,
  ) => {
    setChoice(option);

    // Record selected option value, and added it to results
    const selectedCategory = topic?.topicNode.category as Category | undefined;
    setReaderResults((prev) => {
      if (selectedCategory && selectedCategory in prev.results) {
        return {
          ...prev,
          results: {
            ...prev.results,
            [selectedCategory]: [
              ...prev.results[selectedCategory],
              option.value,
            ],
          },
        };
      } else return prev;
    });

    // Move next scene
    // (nextSceneId e.g., `E3`)
    if (topic) {
      console.log('Next topic ID', option);
      if (option.bridge) {
        setShowBridge(true);
        return;
      }
      goToTopic(option.target);
    }
  };

  const openHintDialog = () => {
    setShowHintDialog(true);
  };

  const closeHintDialog = () => {
    setShowHintDialog(false);
  };

  useEffect(() => {
    // Fetch canonical using a story tree ID
    const initData = async () => {
      setLoaders((prev) => ({ ...prev, main: true }));
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}canonical/story_tree_a`,
          {
            method: 'GET',
          },
        );
        const jsonResult: StoryState['canonical'] = await res.json();

        if (jsonResult) {
          // Find first chapter, then find first topic
          // and finally set user at the beginning of the canonical
          setCanonical(jsonResult);

          const firstChapter = jsonResult.chapters[jsonResult.chaptersOrder[0]];
          const firstTopicId = firstChapter.storyBranch.meta.start;
          setChapter(firstChapter ?? null);
          setTopic(jsonResult.topics[firstTopicId]);
        }
      } catch (error) {
        console.log('Error initializing story canonical data', error);
      }
      setLoaders((prev) => ({ ...prev, main: false }));
    };
    initData();
  }, []);

  const value: StoryCtxState = {
    // State
    state: {
      canonical,
      chapter,
      topic,
      readerResults,
      showHintDialog,
      showBridge,
      showResults,
      choice,
      loaders,
    },

    // Actions
    actions: {
      goToTopic,
      onClickOptionHandler,
      openHintDialog,
      closeHintDialog,
    },
  };

  return <StoryCtx.Provider value={value}>{props.children}</StoryCtx.Provider>;
};
