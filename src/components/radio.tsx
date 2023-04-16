import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type RadioProps = ComponentPropsWithoutRef<'input'>;

export default function Radio({ children, ...props }: RadioProps) {
  return (
    <div className="radio">
      <input type="radio" {...props} />
      <label htmlFor={props.id}>{children}</label>
    </div>
  );
}

type GropProps = PropsWithChildren;

Radio.Group = function Group({ children }: GropProps) {
  return <div className="radio-group">{children}</div>;
};
