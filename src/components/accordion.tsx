import { PropsWithChildren } from 'react';

type AccordionProps = {
  id: string;
  title: string;
} & PropsWithChildren;

export default function Accordion({ children, id, title }: AccordionProps) {
  return (
    <div className="accordion">
      <input className="peer hidden" id={id} type="checkbox" />
      <label className="peer-checked:after:-rotate-90" htmlFor={id}>
        {title}
      </label>
      <div className="peer-checked:visible peer-checked:max-h-screen">
        {children}
      </div>
    </div>
  );
}
