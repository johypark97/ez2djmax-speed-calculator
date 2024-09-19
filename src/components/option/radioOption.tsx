import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import {
  BaseOptionListProps,
  BaseOptionProps,
  defaultTextFactory,
  OptionMap,
  OptionMapValue,
} from './optionMap';

// ================================
// -------- RadioOptionMap --------
// ================================

export interface RadioOptionMapValue
  extends OptionMapValue,
    Pick<ComponentPropsWithoutRef<'input'>, 'value'> {
  id: string;
}

export type RadioOptionMap<
  K,
  V extends RadioOptionMapValue = RadioOptionMapValue,
> = OptionMap<K, V>;

// =============================
// -------- RadioOption --------
// =============================

export interface RadioOptionProps<K, V extends RadioOptionMapValue>
  extends BaseOptionProps<K, V, ChangeEvent<HTMLInputElement>> {
  id: string;
  name: string;
  selectedOptionKey: K;
}

export function RadioOption<K, V extends RadioOptionMapValue>({
  onSelectOption,
  optionEntry,
  selectedOptionKey,
  textFactory = defaultTextFactory,
  ...props
}: RadioOptionProps<K, V>) {
  return (
    <div>
      <input
        checked={optionEntry[0] === selectedOptionKey}
        onChange={(event) => onSelectOption(...optionEntry, event)}
        type="radio"
        value={optionEntry[1].value}
        {...props}
      />
      <label htmlFor={props.id}>{textFactory(optionEntry)}</label>
    </div>
  );
}

// =================================
// -------- RadioOptionList --------
// =================================

export interface RadioOptionListProps<K, V extends RadioOptionMapValue>
  extends BaseOptionListProps<K, V>,
    Omit<RadioOptionProps<K, V>, 'id' | 'optionEntry'> {}

export function RadioOptionList<K, V extends RadioOptionMapValue>({
  optionMap,
  ...props
}: RadioOptionListProps<K, V>) {
  return (
    <>
      {Array.from(optionMap).map((entry) => {
        const id = `${props.name}-${entry[1].id}`;
        return <RadioOption id={id} key={id} optionEntry={entry} {...props} />;
      })}
    </>
  );
}
