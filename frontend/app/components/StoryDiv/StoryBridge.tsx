import { useContext } from 'react';
import { StoryCtx } from './StoryCtx';

export function StoryBridge() {
  const sCtx = useContext(StoryCtx);
  //   return (
  //     <div>
  //       {JSON.stringify(sCtx.choice) + '  ' + JSON.stringify(sCtx.branch)}
  //     </div>
  //   );
  return sCtx.choice?.bridge ?
      <div
        id="storyBridge"
        className="justify-content-lg-evenly justify-content-center mt-0 row gy-2 gx-0"
      >
        hiiiiiiiii
        {sCtx.choice.bridge}
        <button
          type="button"
          autoFocus
          className="w-auto btn btn-dark"
          onClick={() => {
            sCtx.goToScene();
            sCtx.setShowBridge(false);
          }}
        >
          Continue
        </button>
      </div>
    : null;
}
export default StoryBridge;
