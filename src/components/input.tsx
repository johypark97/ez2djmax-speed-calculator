import { ComponentPropsWithoutRef } from 'react';

export interface TextInputProps
  extends Pick<
    ComponentPropsWithoutRef<'input'>,
    'children' | 'className' | 'id' | 'onChange' | 'value'
  > {}

export default function TextInput({
  children,
  className,
  ...props
}: TextInputProps) {
  const className0 = [className, 'text-input'].filter((x) => !!x).join(' ');

  return (
    <div className={className0}>
      <input placeholder="" type="text" {...props} />
      <label htmlFor={props.id}>{children}</label>
    </div>
  );
}
