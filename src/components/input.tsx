import { ComponentPropsWithoutRef } from 'react';

type TextInputProps = {
  label: string;
} & ComponentPropsWithoutRef<'input'>;

export default function TextInput({
  className,
  label,
  ...props
}: TextInputProps) {
  const className0 = [className, 'text-input'].filter((x) => !!x).join(' ');

  return (
    <div className={className0}>
      <input className="peer focus:border-blue-600" type="text" {...props} />
      <label className="peer-focus:border-blue-600" htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
}
