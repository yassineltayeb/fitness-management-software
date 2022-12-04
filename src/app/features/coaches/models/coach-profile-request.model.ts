export interface CoachProfileRequest {
  firstName: string;
  lastName: string;
  genderId: string;
  phone: string;
  coachTypesIds: number[];
  countryId: number;
  cityId: number;
  dateOfBirth: Date;
}
