import { ComponentPropsWithoutRef, useRef, useState } from 'react';

export interface AccordionProps
  extends Pick<
    ComponentPropsWithoutRef<'input'>,
    'children' | 'className' | 'defaultChecked'
  > {
  id: string;
  title: string;
}

export default function Accordion({
  children,
  className,
  defaultChecked,
  id,
  title,
}: AccordionProps) {
  const className0 = [className, 'accordion'].filter((x) => !!x).join(' ');

  const [isExpand, setExpand] = useState<boolean>(!!defaultChecked);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div className={className0}>
      <input
        checked={isExpand}
        id={id}
        onChange={(event) => setExpand(event.target.checked)}
        type="checkbox"
      />
      <label htmlFor={id}>{title}</label>
      <div
        style={{
          height: isExpand ? divRef.current?.offsetHeight : 0,
        }}
      >
        <div ref={divRef}>{children}</div>
      </div>
    </div>
  );
}
