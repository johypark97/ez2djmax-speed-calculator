import { HTMLAttributes } from 'react';

export interface AccordionProps
  extends Pick<HTMLAttributes<Element>, 'children' | 'className'> {
  id: string;
  title: string;
}

export default function Accordion({
  children,
  className,
  id,
  title,
}: AccordionProps) {
  const className0 = [className, 'accordion'].filter((x) => !!x).join(' ');

  return (
    <div className={className0}>
      <input id={id} type="checkbox" />
      <label htmlFor={id}>{title}</label>
      <div>{children}</div>
    </div>
  );
}
