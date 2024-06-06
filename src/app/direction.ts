export const Direction = {
  TO_DJMAX: 'TO_DJMAX',
  TO_EZ2ON: 'TO_EZ2ON',
} as const;

export type DirectionType = (typeof Direction)[keyof typeof Direction];
