export function HintDialog({ content }: { content: string }) {
  return (
    <dialog
      id="hintDialog"
      className="bg-white border-0 rounded-1"
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
