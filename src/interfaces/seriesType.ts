export interface SeriesType {
  series?: SeriesType;
  _id?: string | null;
  title: string;
  gender: string;
  rate: number | number[];
  img64?: string;
  description: string;
  isLast?: boolean;
}

export interface MySeries {
    _id?: string | null;
    title: string;
    gender: string;
    rate: number;
    img64?: string;
    description: string;
    isLast?: boolean;
}

export interface Item {
  item: SeriesType;
  index: number;
}

export interface IAction {
  type?: string;
  serieToEdit?: string;
  field?: string;
  value?: string | number | number[];
}

export interface IActionUser {
  type?: string;
  email?: string;
  password?: string;
  field?: string;
  value?: string | number | number[];
}
