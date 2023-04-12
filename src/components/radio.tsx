import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type RadioProps = ComponentPropsWithoutRef<'input'>;

export const Radio = ({ children, className, type, ...props }: RadioProps) => {
  const type0 = type ?? 'radio';

  let className0 = className ?? '';
  className0 += 'hover:cursor-pointer inline-block ml-2 select-none';

  return (
    <div className="inline-flex items-center">
      <input
        className="h-4 w-4 focus:ring-2 focus:ring-blue-200"
        type={type0}
        {...props}
      />
      <label className={className0} htmlFor={props.id}>
        {children}
      </label>
    </div>
  );
};

const Group = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full flex-col space-y-2">{children}</div>;
};
Radio.Group = Group;
