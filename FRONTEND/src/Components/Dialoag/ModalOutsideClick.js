import React from "react";

const ModalOutsideClick = ({ id, children, className, open }) => {
  return (
    <dialog id={id} className={`modal ${open} `}>
      <div className={`modal-box ${className}`}>{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalOutsideClick;

// <div
// className="btn btn-outline"
// onClick={() =>
//   document.getElementById("update_profile").showModal()
// }
// >
// update profile
// </div>
