import { ComponentPropsWithoutRef, DOMAttributes } from 'react';

interface DropdownProps extends ComponentPropsWithoutRef<'div'> {
  text?: DOMAttributes<Element>['children'];
}

export default function Dropdown({
  children,
  className,
  text,
  ...props
}: DropdownProps) {
  const className0 = [className, 'dropdown'].filter((x) => !!x).join(' ');

  return (
    <div className={className0} {...props}>
      <button>{text}</button>
      <div>{children}</div>
    </div>
  );
}
