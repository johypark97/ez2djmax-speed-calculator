import { ComponentPropsWithoutRef, MouseEvent } from 'react';
import {
  BaseOptionListProps,
  BaseOptionProps,
  defaultTextFactory,
  OptionMap,
  OptionMapValue,
} from './optionMap';

// =================================
// -------- ButtonOptionMap --------
// =================================

export interface ButtonOptionMapValue
  extends OptionMapValue,
    Pick<ComponentPropsWithoutRef<'button'>, 'value'> {
  id: string;
}

export type ButtonOptionMap<
  K,
  V extends ButtonOptionMapValue = ButtonOptionMapValue,
> = OptionMap<K, V>;

// ==============================
// -------- ButtonOption --------
// ==============================

export type ButtonOptionProps<
  K,
  V extends ButtonOptionMapValue,
> = BaseOptionProps<K, V, MouseEvent<HTMLButtonElement, globalThis.MouseEvent>>;

export function ButtonOption<K, V extends ButtonOptionMapValue>({
  onSelectOption,
  optionEntry,
  textFactory = defaultTextFactory,
}: ButtonOptionProps<K, V>) {
  return (
    <button
      onClick={(event) => onSelectOption(...optionEntry, event)}
      value={optionEntry[1].value}
    >
      {textFactory(optionEntry)}
    </button>
  );
}

// ==================================
// -------- ButtonOptionList --------
// ==================================

export interface ButtonOptionListProps<K, V extends ButtonOptionMapValue>
  extends BaseOptionListProps<K, V>,
    Omit<ButtonOptionProps<K, V>, 'optionEntry'> {
  name: string;
}

export function ButtonOptionList<K, V extends ButtonOptionMapValue>({
  name,
  optionMap,
  ...props
}: ButtonOptionListProps<K, V>) {
  return (
    <>
      {Array.from(optionMap).map((entry) => (
        <ButtonOption
          key={`${name}-${entry[1].id}`}
          optionEntry={entry}
          {...props}
        />
      ))}
    </>
  );
}
