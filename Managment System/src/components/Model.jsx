import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import Button from './Button.jsx'

const Model = forwardRef(function Model({ children, buttonCaption }, ref) {
  const dialog = useRef();
  
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-sm shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right" >
        <Button label="okay">{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root") // Ensure model-root exists in your HTML
  );
});

export default Model;
