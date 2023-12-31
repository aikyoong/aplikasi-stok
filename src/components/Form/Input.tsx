import clsx from "clsx";
import { useFormContext, type RegisterOptions } from "react-hook-form";
// import { HiExclamationCircle } from "react-icons/hi";

export type InputProps = {
  label?: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;

  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"input">;

function Input({
  placeholder = "",
  helperText,
  id,
  type = "text",
  readOnly = false,
  validation,

  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="relative ">
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? "bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300"
              : errors[id]
              ? "focus:ring-red-500 border-red-500 focus:border-red-500"
              : "focus:ring-primary-500 border-gray-300 focus:border-primary-500",
            " shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light "
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {/* {errors.id && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <HiExclamationCircle className="text-xl text-red-500" />
          </div>
        )} */}
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {/* {errors[id] && (
          <span className="text-sm text-red-500">{errors[id]?.message}</span>
        )} */}
      </div>
    </div>
  );
}

export default Input;
