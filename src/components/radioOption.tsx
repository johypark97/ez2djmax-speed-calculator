import { ChangeEvent, ComponentPropsWithoutRef, DOMAttributes } from 'react';

// ================================
// -------- InputWithLabel --------
// ================================

export interface LabeledInputProps extends ComponentPropsWithoutRef<'input'> {}

export function InputWithLabel<T>({ children, ...props }: LabeledInputProps) {
  return (
    <>
      <input {...props} />
      <label htmlFor={props.id}>{children}</label>
    </>
  );
}

// ================================
// -------- RadioWithLabel --------
// ================================

export interface RadioWithLabelProps extends Omit<LabeledInputProps, 'type'> {}

export function RadioWithLabel({ ...props }: RadioWithLabelProps) {
  return <InputWithLabel type="radio" {...props} />;
}

// ===========================
// -------- OptionMap --------
// ===========================

export interface OptionMapValue extends Pick<RadioWithLabelProps, 'value'> {
  id: string;
  text?: string;
}

export interface OptionMap<K = any, V extends OptionMapValue = OptionMapValue>
  extends Map<K, V> {}

// =============================
// -------- RadioOption --------
// =============================

export interface RadioOptionProps<K, V extends OptionMapValue> {
  id: string;
  name: string;
  onSelectOption: (
    key: K,
    value: V,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  optionKey: K;
  optionValue: V;
  selectedOptionKey: K;
  textFactory?: (option: V) => DOMAttributes<Element>['children'];
}

export function RadioOption<K, V extends OptionMapValue>({
  onSelectOption,
  optionKey,
  optionValue,
  selectedOptionKey,
  textFactory = (x) => x.text,
  ...props
}: RadioOptionProps<K, V>) {
  return (
    <div>
      <RadioWithLabel
        checked={optionKey === selectedOptionKey}
        onChange={(event) => onSelectOption(optionKey, optionValue, event)}
        value={optionValue.value}
        {...props}
      >
        {textFactory(optionValue)}
      </RadioWithLabel>
    </div>
  );
}

// =================================
// -------- RadioOptionList --------
// =================================

export interface RadioOptionListProps<K, V extends OptionMapValue>
  extends Omit<RadioOptionProps<K, V>, 'id' | 'optionKey' | 'optionValue'> {
  optionMap: OptionMap<K, V>;
}

export default function RadioOptionList<K, V extends OptionMapValue>({
  optionMap,
  ...props
}: RadioOptionListProps<K, V>) {
  return (
    <>
      {Array.from(optionMap).map(([key, value]) => {
        const id = `${props.name}-${value.id}`;
        return (
          <RadioOption
            id={id}
            key={id}
            optionKey={key}
            optionValue={value}
            {...props}
          />
        );
      })}
    </>
  );
}
