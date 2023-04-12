import { PropsWithChildren, useState } from 'react';

type AccordionProps = {
  id: string;
  title: string;
} & PropsWithChildren;

export const Accordion = ({ children, id, title }: AccordionProps) => {
  const [display, setDisplay] = useState<boolean>(false);

  let arrowClassName = 'text-2xl transition-transform';
  if (display) arrowClassName += ' -rotate-90';

  let divClassName = 'duration-500 ease-in-out overflow-auto transition-all';
  divClassName += display ? ' max-h-screen visible' : ' invisible max-h-0';

  const toggle = () => {
    setDisplay(!display);
  };

  return (
    <div>
      <input className="peer hidden" id={id} onClick={toggle} type="checkbox" />
      <label
        className="mx-2 flex cursor-pointer select-none justify-between text-xl hover:bg-gray-100"
        htmlFor={id}
      >
        <span>{title}</span>
        <span className={arrowClassName}>&lt;</span>
      </label>
      <div className={divClassName}>{children}</div>
    </div>
  );
};
