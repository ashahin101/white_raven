import { useStoryCtx } from './StoryCtx';

export function StoryBridge() {
  const { state: sState, actions: sActions } = useStoryCtx();

  return sState.choice?.bridge ?
      <div
        id="storyBridge"
        className="justify-content-lg-evenly align-items-center align-content-center justify-content-center gap-2 mt-0 align-middle row gy-2 gx-0"
      >
        {sState.choice.bridge}
        <button
          type="button"
          autoFocus
          className="w-auto btn btn-dark"
          onClick={() => {
            sActions.goToTopic();
            // sState.hideBridge();
          }}
        >
          Continue
        </button>
      </div>
    : null;
}
export default StoryBridge;
