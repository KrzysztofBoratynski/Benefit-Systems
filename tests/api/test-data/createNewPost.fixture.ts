import { faker } from '@faker-js/faker';

export function createNewPost(): Post {
  return {
    title: faker.lorem.word(),
    body: faker.lorem.sentences(),
    userId: faker.number.int(),
  };
}
