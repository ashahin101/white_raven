import { useEffect, useMemo, useRef } from 'react';
import { useStoryCtx } from './StoryCtx';

export function StorylineOptions() {
  const { state: sState, actions: sActions } = useStoryCtx();
  const optionsDiv = useRef<HTMLDivElement>(null);

  const optionsList = useMemo(
    () =>
      sState.topic && Object.keys(sState.topic?.topicNode.options).length ?
        Object.entries(sState.topic?.topicNode.options)
      : [],
    [sState.topic],
  );

  // When options are re/loaded focus on the first option button;
  // good for desktop experience.
  useEffect(() => {
    if (optionsDiv.current) {
      const firstBtn = optionsDiv.current.querySelector('button');
      requestAnimationFrame(() => {
        firstBtn?.focus({ focusVisible: true });
      });
    }
  }, [sState.topic?.meta.id]);

  return (
    <div id="choicesDiv" ref={optionsDiv} className="p-0 container">
      <div className="row gy-3">
        {optionsList.map(([key, choice]) => {
          return (
            <div className="col-12 col-md-6">
              <div className="bg-light p-2 border border-secondary-subtle w-100">
                <span className="bg-white -m-2 p-1 pt-0 border border-secondary-subtle fw-bold">
                  {key}.
                </span>
                <span className="p-2">{choice.storyChoice}</span>
                <div className="d-flex justify-content-end p-2 w-100">
                  <button
                    type="button"
                    autoFocus
                    className="btn btn-dark"
                    onClick={(e) =>
                      sActions.onClickOptionHandler(e, key, choice)
                    }
                  >
                    Select {key}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
