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
      <span>{label}</span>
      <input type="text" {...props} />
    </div>
  );
}
