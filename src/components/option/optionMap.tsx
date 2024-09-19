// ===========================
// -------- OptionMap --------
// ===========================

import { DOMAttributes, SyntheticEvent } from 'react';

export interface OptionMapValue {
  text?: string;
}

export type OptionMap<K, V extends OptionMapValue> = Map<K, V>;

// =================================
// -------- BaseOptionProps --------
// =================================

export interface OnSelectOption<
  K,
  V extends OptionMapValue,
  E extends SyntheticEvent,
> {
  (key: K, value: V, event: E): void;
}

export interface TextFactory<K, V extends OptionMapValue> {
  (entry: [K, V]): DOMAttributes<Element>['children'];
}

export const defaultTextFactory: TextFactory<unknown, OptionMapValue> = (x) =>
  x[1].text;

export interface BaseOptionProps<
  K,
  V extends OptionMapValue,
  E extends SyntheticEvent,
> {
  onSelectOption: OnSelectOption<K, V, E>;
  optionEntry: [K, V];
  textFactory?: TextFactory<K, V>;
}

export interface BaseOptionListProps<K, V extends OptionMapValue> {
  optionMap: OptionMap<K, V>;
}
