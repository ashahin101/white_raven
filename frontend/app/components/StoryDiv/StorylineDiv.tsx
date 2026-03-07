import React from 'react';
import { useStoryCtx } from './StoryCtx';

interface StorylineDivProps {
  storyline?: React.ReactNode;
  children?: React.ReactNode;
}

export const StorylineDiv: React.FC<StorylineDivProps> = (props) => {
  const { actions: sActions } = useStoryCtx();
  return (
    <div
      id="mainStorylineDiv"
      className="d-flex align-items-baseline justify-content-center col-12"
    >
      <p id="mainStorylineText" className="me-2">
        {props.storyline ? props.storyline : props.children || null}
      </p>
      <button
        id="hintBtn"
        className="bg-info-subtle border-info rounded-1"
        title="hint"
        onClick={() => {
          sActions.openHintDialog();
        }}
      >
        ?
      </button>
    </div>
  );
};
export default StorylineDiv;
