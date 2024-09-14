const BPM = 120;
const SECOND = 60;
const NOTE_TIME_CONSTANT = BPM / SECOND;

// const DJMAX_WIDTH = 502;
const DJMAX_BAR = 560;
const DJMAX_HEIGHT = 754;

// const EZ2ON_WIDTH = 410;
const EZ2ON_BAR = 482;
const EZ2ON_HEIGHT_NEW = 800;
const EZ2ON_HEIGHT_OLD = 818;

export interface Graphic {
  readonly bar: number;
  readonly height: number;
}

export const GRAPHIC_DJMAX: Graphic = {
  bar: DJMAX_BAR,
  height: DJMAX_HEIGHT,
};

export const GRAPHIC_EZ2ON_NEW: Graphic = {
  bar: EZ2ON_BAR,
  height: EZ2ON_HEIGHT_NEW,
};

export const GRAPHIC_EZ2ON_OLD: Graphic = {
  bar: EZ2ON_BAR,
  height: EZ2ON_HEIGHT_OLD,
};

export const calculateNoteTime = (speed: number, graphic: Graphic): number =>
  (graphic.height / (graphic.bar * speed)) * NOTE_TIME_CONSTANT;

export interface ConvertSpeedFunction {
  (speed: number, from: Graphic, to: Graphic): number;
}

export const convertSpeed_bar: ConvertSpeedFunction = (speed, from, to) =>
  (speed * from.bar) / to.bar;

export const convertSpeed_height: ConvertSpeedFunction = (speed, from, to) =>
  (convertSpeed_bar(speed, from, to) * to.height) / from.height;
