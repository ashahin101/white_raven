import { useStoryCtx } from './StoryCtx';
import StoryScenery from './StoryScenery';
import StorylineDiv from './StorylineDiv';
import { StorylineOptions } from './StorylineOptions';
import StoryBridge from './StoryBridge';
import { FinalResults } from './FinalResults';
import HintDialog from './HintDialog';

export function StoryDiv() {
  const { state: sState } = useStoryCtx();
  return (
    <div className='className="d-block position-relative'>
      <HintDialog content={sState.topic?.topicNode.question ?? ''} />
      <div
        id="storyDiv"
        className="d-block position-relative pb-3 container-sm"
      >
        <div className="justify-content-center row gy-2 gy-md-4">
          {/* {JSON.stringify(sState.topic)} */}
          <StoryScenery
            loading={sState.loaders.main}
            imgSrc={
              sState.topic?.topicNode.scenery ?
                sState.topic.topicNode.scenery
              : 'media/images/fallback.jpg'
            }
          />
          <div
            id="mainStorylineDiv"
            className="d-flex align-items-baseline justify-content-center col-12 col-lg-8"
          >
            {sState.loaders.main ?
              <div className="w-100 placeholder-glow">
                <h5 className="card-title">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-10"></span>
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-7"></span>
                </p>
              </div>
            : null}

            {!sState.loaders.main && sState.showBridge ?
              <StoryBridge />
            : null}
            {!sState.loaders.main && !sState.showBridge && !sState.showResults ?
              <div className="w-100">
                <StorylineDiv storyline={sState.topic?.topicNode.storyline} />
                <StorylineOptions />
              </div>
            : null}
            {!sState.loaders.main && sState.showResults ?
              <FinalResults />
            : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoryDiv;
