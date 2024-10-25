import { faker } from '@faker-js/faker';

export function generateCustomerData(): CustomerData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
}
