import type React from 'react';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { StoryCtx } from './StoryCtx';

export const StorylineOptions: React.FC<React.PropsWithChildren> = () => {
  const sCtx = useContext(StoryCtx);
  const optionsDiv = useRef<HTMLDivElement>(null);

  const optionsList = useMemo(
    () =>
      sCtx.storyNode && Object.keys(sCtx.storyNode.options).length ?
        Object.entries(sCtx.storyNode.options)
      : [],
    [sCtx.storyNode?.options],
  );

  // When options are re/loaded focus on the first option button
  useEffect(() => {
    if (optionsDiv.current) {
      const firstBtn = optionsDiv.current.querySelector('button');
      requestAnimationFrame(() => {
        firstBtn?.focus();
      });
    }
  }, [sCtx.storyNode]);

  return (
    <div
      id="choicesDiv"
      ref={optionsDiv}
      className="justify-content-lg-evenly justify-content-center mt-0 row gy-2 gx-0"
    >
      {optionsList.map(([key, choice]) => {
        return (
          <div className="bg-light border border-secondary-subtle">
            <div className="w-100">
              <span className="bg-white p-1 pt-0 border border-secondary-subtle fw-bold">
                {key}.
              </span>
              <span className="p-2">{choice.storyChoice}</span>
            </div>
            <div className="d-flex justify-content-end p-2 w-100">
              <button
                type="button"
                autoFocus
                className="btn btn-dark"
                onClick={(e) => sCtx.onClickOptionHandler(e, key, choice)}
              >
                Select {key}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
