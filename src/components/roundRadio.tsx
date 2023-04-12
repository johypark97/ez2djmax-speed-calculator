import { ComponentPropsWithoutRef } from 'react';

const commonClassList = [
  'block',
  'cursor-pointer',
  'font-medium',
  'hover:bg-blue-400',
  'peer-checked:bg-white',
  'peer-checked:text-black',
  'px-4',
  'py-2',
  'rounded-full',
  'select-none',
  'text-center',
  'text-md',
  'text-white',
  'transition-colors',
  'whitespace-nowrap',
];
const commonClass = commonClassList.join(' ');

export const RoundRadio = ({
  children,
  className,
  type,
  ...props
}: ComponentPropsWithoutRef<'input'>) => {
  const type0 = type ?? 'radio';

  let className0 = className ?? '';
  className0 += ' ' + commonClass;

  return (
    <div className="w-full ">
      <input className="peer hidden" type={type0} {...props} />
      <label className={className0} htmlFor={props.id}>
        {children}
      </label>
    </div>
  );
};

const Group = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  let className0 = className ?? '';
  className0 += ' flex rounded-full border-2 border-blue-600 bg-blue-600';

  return (
    <div className={className0} {...props}>
      {children}
    </div>
  );
};
RoundRadio.Group = Group;
