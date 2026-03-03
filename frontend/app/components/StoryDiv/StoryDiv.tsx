import { useContext } from 'react';
import { StoryCtx } from './StoryCtx';
import StoryScenery from './StoryScenery';
import StorylineDiv from './StorylineDiv';
import { StorylineOptions } from './StorylineOptions';
import StoryBridge from './StoryBridge';

export function StoryDiv() {
  const sCtx = useContext(StoryCtx);
  return (
    <div id="storyDiv" className="container-sm">
      <StoryScenery
        imgSrc={
          sCtx.storyNode ?
            sCtx.storyNode.scenery
          : 'media/images/scenery-placeholder.png'
        }
      />
      {sCtx.showBridge ?
        <StoryBridge />
      : <>
          <StorylineDiv storyline={sCtx.storyNode?.storyline} />
          <StorylineOptions />
        </>
      }
    </div>
  );
}
export default StoryDiv;
