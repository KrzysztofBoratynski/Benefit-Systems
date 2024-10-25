import Endpoints from './enums/enpoints.enum';
import HttpStatusCode from './enums/HttpStatusCode.enum';
import { test, expect } from './fixtures/API.fixture';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import baseAPI from './utils/baseAPI';
import { createNewPost } from './test-data/createNewPost.fixture';
import { APIResponse } from '@playwright/test';

test.use({ baseURL: process.env.JSON_PLACEHOLDER_ENPOINT as string });

const ajv = new Ajv();
addFormats(ajv);

let response: APIResponse;
let responseJson: JSON;
let valid: boolean;
let postsNumber : number;
let id :number;
test.describe('API tests for jsonPlaceholer', async () => {
  async function getNumberOfPosts(API: baseAPI): Promise<number> {
    response = await API.getRequest(Endpoints.POSTS);
    expect(response.status()).toBe(HttpStatusCode.OK);
    responseJson = await response.json();

    return JSON.parse(JSON.stringify(responseJson)).length;
  }
  test('Should check GET posts schema', async ({ API }) => {
    response = await API.getRequest(Endpoints.POSTS);
    expect(response.status()).toBe(HttpStatusCode.OK);
    responseJson = await response.json();
    valid = ajv.validate(require('./test-data/posts.schema.json'), responseJson);
    if (!valid) {
      console.error('AJV Validation Errors:', ajv.errorsText());
    }
    expect(valid).toBe(true);
  });

  test('Should check GET post schema', async ({ API }) => {
    postsNumber = await getNumberOfPosts(API);
    id = Math.floor(Math.random() * postsNumber) + 1;
    response = await API.getRequest(Endpoints.POSTS + `/${id}`);

    expect(response.status()).toBe(HttpStatusCode.OK);

    responseJson = await response.json();
    valid = ajv.validate(require('./test-data/post.schema.json'), responseJson);

    if (!valid) {
      console.error('AJV Validation Errors:', ajv.errorsText());
    }

    expect(valid).toBe(true);
  });

  test('Should check GET comments schema', async ({ API }) => {
    postsNumber = await getNumberOfPosts(API);
    id = Math.floor(Math.random() * postsNumber) + 1;
    response = await API.getRequest(Endpoints.COMMENTS + `?postId=${id}`);

    expect(response.status()).toBe(HttpStatusCode.OK);

    responseJson = await response.json();
    valid = ajv.validate(require('./test-data/comments.schema.json'), responseJson);

    if (!valid) {
      console.error('AJV Validation Errors:', ajv.errorsText());
    }

    expect(valid).toBe(true);
  });

  test('Should CREATE new post', async ({ API }) => {
    const requestBody = createNewPost();

    response = await API.postRequest(Endpoints.POSTS, requestBody);
    expect(response.status()).toBe(HttpStatusCode.CREATED);
    const responseJson: Post = await response.json();

    expect(responseJson.title).toBe(requestBody.title);
    expect(responseJson.body).toBe(requestBody.body);
    expect(responseJson.userId).toBe(requestBody.userId);
  });

  test('Should not CREATE new post with empty body', async ({ API }) => {
    response = await API.postRequestWithoutBody(Endpoints.POSTS);
    expect(response.status()).toBe(HttpStatusCode.CREATED);
    await response.json();
  });

  test('Should UPDATE existing post', async ({ API }) => {
    const requestBody = createNewPost();
    postsNumber = await getNumberOfPosts(API);
    id = Math.floor(Math.random() * postsNumber) + 1;

    response = await API.putRequest(Endpoints.POSTS + `/${id}`, requestBody);
    expect(response.status()).toBe(HttpStatusCode.OK);
    const responseJson: Post = await response.json();

    expect(responseJson.title).toBe(requestBody.title);
    expect(responseJson.body).toBe(requestBody.body);
    expect(responseJson.userId).toBe(requestBody.userId);
  });

  test('Should return NOT_FOUND when trying to UPDATE on wrong endpoint', async ({ API }) => {
    const requestBody = createNewPost();

    response = await API.putRequest(Endpoints.POSTS, requestBody);
    expect(response.status()).toBe(HttpStatusCode.NOT_FOUND);
  });

  test('Should return INTERNAL_SERVER_ERROR when trying to UPDATE non existing resource', async ({ API }) => {
    const requestBody = createNewPost();
    postsNumber = await getNumberOfPosts(API);
    id = postsNumber + 100;

    response = await API.putRequest(Endpoints.POSTS + `/${id}`, requestBody);
    expect(response.status()).toBe(HttpStatusCode.INTERNAL_SERVER_ERROR);
  });

  test('Should return empty body when trying to UPDATE without providing body', async ({ API }) => {
    postsNumber = await getNumberOfPosts(API);
    id = Math.floor(Math.random() * postsNumber) + 1;

    response = await API.putWithoutBodyRequest(Endpoints.POSTS + `/${id}`);
    expect(response.status()).toBe(HttpStatusCode.OK);
    const responseJson: Post = await response.json();
    expect(JSON.stringify(responseJson) === '{}').toBe(true);
  });
});
