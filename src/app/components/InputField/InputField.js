import React, { useState } from "react";
import { sanitizeText } from "../../../utils";

const InputField = ({
  fieldName,
  field,
  setField,
  required = true,
  error = "",
  placeholder,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-group">
      <label>{fieldName}</label>
      <input
        value={field}
        onChange={(e) => {
          setField(
            type === "password" ? sanitizeText(e.target.value) : e.target.value
          );
          e.target.setCustomValidity("");
        }}
        className="form-control form-control-user"
        type={type === "password" ? (showPassword ? "text" : type) : type}
        id={`example-input-${fieldName}`}
        error={error}
        required={required}
        aria-describedby="emailHelp"
        // helperText={helperText}
        onInvalid={(e) => {
          if (error.length > 0) {
            e.target.setCustomValidity(error);
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
