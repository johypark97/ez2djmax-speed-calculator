import { ComponentPropsWithoutRef } from 'react';

type RoundRadioProps = ComponentPropsWithoutRef<'input'>;

export default function RoundRadio({ children, ...props }: RoundRadioProps) {
  return (
    <div className="round-radio">
      <input className="peer hidden" type="radio" {...props} />
      <label
        className="peer-checked:bg-white peer-checked:text-black"
        htmlFor={props.id}
      >
        {children}
      </label>
    </div>
  );
}

type GroupProps = ComponentPropsWithoutRef<'div'>;

RoundRadio.Group = function Group({
  children,
  className,
  ...props
}: GroupProps) {
  const className0 = [className, 'round-radio-group']
    .filter((x) => !!x)
    .join(' ');

  return (
    <div className={className0} {...props}>
      {children}
    </div>
  );
};
