import { Gender } from "./gender";
import { LabelType } from "./label";

export interface ProductLabel {
  gender: Gender;
  type: LabelType;
  offset: number;
}
