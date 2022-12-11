import { KeyValuePairs } from "src/app/shared/models/key-value-pairs.model";

export interface CoachClassResponse {
  id: number;
  title: string;
  description: string;
  location: string;
  classDate: Date;
  duration: number;
  availableSpaces: number;
  coach: KeyValuePairs;
}
