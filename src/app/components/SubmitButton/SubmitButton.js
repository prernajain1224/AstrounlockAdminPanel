import React from "react";

const SubmitButton = ({ btnClass, btnText, customStyles = {} }) => {
  return (
    <div className="form-group">
      <button className={btnClass} style={customStyles}>
        {btnText}
      </button>
    </div>
  );
};

export default SubmitButton;
