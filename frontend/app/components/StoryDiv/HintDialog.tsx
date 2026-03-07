import { useEffect, useRef } from 'react';
import { useStoryCtx } from './StoryCtx';

export function HintDialog({ content }: { content: string }) {
  const { state: sState, actions: sActions } = useStoryCtx();
  const hintDialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (hintDialogRef.current) {
      if (sState.showHintDialog) hintDialogRef.current?.showModal();
      else {
        sActions.closeHintDialog();
        hintDialogRef.current.addEventListener('close', (e) =>
          sActions.closeHintDialog(),
        );
      }
    }
  }, [sState.showHintDialog]);

  // if (!sState.showHintDialog) return null;
  return (
    <dialog
      id="hintDialog"
      ref={hintDialogRef}
      className="bg-white border border-secondary-subtle rounded-1"
      style={{ height: 'fit-content' }}
    >
      <form method="dialog">
        <p id="hintBody">{content}</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-dark">Got it</button>
        </div>
      </form>
    </dialog>
  );
}
export default HintDialog;
