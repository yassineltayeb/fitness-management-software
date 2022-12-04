export interface CoachProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  genderId: string;
  email: string;
  phone: string;
  coachTypesIds: number[];
  countryId: number;
  cityId: number;
  dateOfBirth: Date;
}
