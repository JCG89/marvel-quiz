import React from "react";

const Modal = ({ showModal, children, hideModal }) => {
  return (
    showModal && (
      <div className="modalBackground">
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};
export default Modal;
