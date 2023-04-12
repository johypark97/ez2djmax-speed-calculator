import { ComponentPropsWithoutRef } from 'react';

type TextInputProps = {
  label: string;
  type?: string;
} & ComponentPropsWithoutRef<'input'>;

export const TextInput = ({
  className,
  label,
  type,
  ...props
}: TextInputProps) => {
  const type0 = type ?? 'text';

  let className0 = className ?? '';
  className0 += ' flex';

  return (
    <div className={className0}>
      <span className="inline-flex select-none items-center rounded-l-full border-2 border-r-0 border-gray-400 bg-gray-100 px-4 text-lg">
        {label}
      </span>
      <input
        className="w-full rounded-r-full border-2 border-l-0 border-gray-400 px-4 text-lg"
        type={type0}
        {...props}
      ></input>
    </div>
  );
};
