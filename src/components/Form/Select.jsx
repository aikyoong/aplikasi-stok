import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

function SelectWrapper({
  options,
  name,
  error,
  value: val,
  label,
  control,
  unregister,
  rules,
  isVisible = true,
}) {
  const [visible, setVisible] = useState(isVisible);
  useEffect(() => {
    setVisible((prevValue) => {
      prevValue !== isVisible && !isVisible && unregister(name);
      return isVisible;
    });
  }, [isVisible]);

  return visible ? (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Selects
          label={label}
          error={error}
          value={value}
          placeholder={label}
          options={options}
          onChange={onChange}
        />
      )}
      name={name}
      defaultValue={val}
      control={control}
      rules={rules}
    />
  ) : null;
}

const Selects = ({ label, error, value, ...rest }) => {
  return (
    <div className="relative">
      <Select value={value} {...rest} />
      {/* {label && value && (
        <label
          className={
            "text-gray-300 absolute -top-3 -translate-y-1/2 transition duration-150 pointer-events-none py-0.5 mb-0 rounded-md left-4 px-2 text-xs "
          }
        >
          {label}
        </label>
      )} */}
      {error && (
        <span className="absolute bottom-1 text-xs text-error-300 dark:text-error-50 left-7">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default SelectWrapper;
