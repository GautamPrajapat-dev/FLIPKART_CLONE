/* eslint-disable react/prop-types */

import { memo } from "react";

const ModalOutsideClick = ({
  id,
  children,
  className,
  open,
  backdrop,
  title,
}) => {
  return (
    <dialog id={id} className={`modal ${open} `}>
      <div className={`modal-box ${className}`}>
        {backdrop ? (
          <form method="dialog" className="">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">{title}</h3>
              <button className=" btn btn-sm btn-circle btn-ghost">X</button>
            </div>
          </form>
        ) : (
          <h3 className="text-lg font-bold">{title}</h3>
        )}
        <div>{children}</div>
      </div>
      {!backdrop && (
        <form method="dialog" className="modal-backdrop">
          <button className="">Close</button>
        </form>
      )}
    </dialog>
  );
};

export default memo(ModalOutsideClick);

// <div
// className="btn btn-outline"
// onClick={() =>
//   document.getElementById("update_profile").showModal()
// }
// >

// update profile
// </div>
