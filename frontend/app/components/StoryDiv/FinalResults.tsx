import React from 'react';
import { useStoryCtx } from './StoryCtx';

export const FinalResults: React.FC<object> = () => {
  const { state: sState } = useStoryCtx();

  const readerPersonality = sState.readerResults.personality;
  return (
    <div className="px-1 px-md-0 col-md-10">
      <div className="mb-5 mb-lg-3">
        {readerPersonality ?
          <>
            <div className="d-flex align-items-baseline">
              <h4 className="me-2 g-1">{readerPersonality.title}</h4>
              <p className="text-muted">
                {`[${readerPersonality.id} Personality]`}
              </p>
            </div>
            <p dir="auto">{readerPersonality?.description}</p>
            <a
              className="text-6"
              href={`https://www.16personalities.com/${readerPersonality.id.toLowerCase()}-personality`}
            >
              For more details
            </a>
          </>
        : null}
      </div>
    </div>
  );
};
