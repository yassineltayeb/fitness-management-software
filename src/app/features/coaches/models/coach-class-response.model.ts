import { KeyValuePairs } from "src/app/shared/models/key-value-pairs.model";

export interface CoachClassResponse {
  title: string;
  description: string;
  location: string;
  classDate: string;
  duration: number;
  availableSpaces: number;
  coach: KeyValuePairs;
}
