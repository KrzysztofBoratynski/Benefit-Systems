import { test as base, expect } from '@playwright/test';
import api from '../utils/baseAPI';

type MyFixtures = {
  API: api;
};

const test = base.extend<MyFixtures>({
  API: async ({ request }, use) => {
    const API = new api(request);
    await use(API);
  },
});

export { test };
export { expect };
