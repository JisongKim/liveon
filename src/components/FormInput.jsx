import { forwardRef, useId } from 'react';

function FormInput(
  {
    label,
    type,
    name,
    placeholder,
    labelClassName,
    inputClassName,
    ...restProps
  },
  ref
) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        className={inputClassName}
        {...restProps}
      />
    </>
  );
}

export default forwardRef(FormInput);