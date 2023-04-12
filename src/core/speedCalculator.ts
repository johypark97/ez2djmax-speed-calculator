// const DJMAX_WIDTH = 502;
const DJMAX_BAR = 560;
const DJMAX_HEIGHT = 755;

// const EZ2ON_WIDTH = 410;
const EZ2ON_BAR = 481;
const EZ2ON_HEIGHT_NEW = 800;
const EZ2ON_HEIGHT_OLD = 818;

const BAR_RATIO = DJMAX_BAR / EZ2ON_BAR;
const NEW_RATIO = EZ2ON_HEIGHT_NEW / DJMAX_HEIGHT;
const OLD_RATIO = EZ2ON_HEIGHT_OLD / DJMAX_HEIGHT;

export const Mode = {
  SAME: 'SAME',
  NEW: 'NEW',
  OLD: 'OLD',
} as const;
export type ModeType = (typeof Mode)[keyof typeof Mode];

export const calcToEz2on = (speed: number, mode: ModeType): number => {
  let value = speed * BAR_RATIO;

  if (mode === Mode.SAME) return value;
  else if (mode === Mode.NEW) return value * NEW_RATIO;
  else if (mode === Mode.OLD) return value * OLD_RATIO;
  else return -1;
};

export const calcToDjmax = (speed: number, mode: ModeType): number => {
  let value = speed / BAR_RATIO;

  if (mode === Mode.SAME) return value;
  else if (mode === Mode.NEW) return value / NEW_RATIO;
  else if (mode === Mode.OLD) return value / OLD_RATIO;
  else return -1;
};
