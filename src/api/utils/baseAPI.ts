import { APIRequestContext } from 'playwright-core';

export default class baseAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postRequest(endpoint: string, reqBody: object) {
    const response = await this.request.post(endpoint, {
      data: reqBody,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  }

  async postRequestWithoutBody(endpoint: string) {
    const response = await this.request.post(endpoint);
    return response;
  }

  async getRequest(endpoint: string) {
    const response = await this.request.get(endpoint);
    return response;
  }

  async putRequest(endpoint: string, requestBody: object) {
    const response = await this.request.put(endpoint, {
      data: requestBody,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  }

  async putWithoutBodyRequest(endpoint: string) {
    const response = await this.request.put(endpoint, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  }

  async patchRequest(endpoint: string, requestBody: object) {
    const response = await this.request.patch(endpoint, {
      data: requestBody,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  }

  async deleteRequest(endpoint: string) {
    const response = await this.request.delete(endpoint, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  }
}
