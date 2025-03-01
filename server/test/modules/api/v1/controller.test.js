import { describe, expect, jest, test } from 'bun:test';
import * as httpMocks from 'node-mocks-http';
import { default as userController } from '@/modules/users/api/v1/controller';
import * as userService from '@/modules/users/api/v1/service';
import {
  mockCreateUserRequestBody,
  mockGetAllUsersResponse,
  mockGetUserResponse,
  mockUpdateUserRequestBody
} from '../../../__mocks__';

describe('user-controller-tests', () => {
  const next = jest.fn();
  test('01. should add a user successfully', () => {
    jest.spyOn(userService, 'createUser').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockCreateUserRequestBody
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  test('02. should get all users successfully', () => {
    jest.spyOn(userService, 'getUsers').mockResolvedValue(mockGetAllUsersResponse);
    const req = httpMocks.createRequest({
      method: 'get',
      url: '/'
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  test('03. should get a user successfully', () => {
    jest.spyOn(userService, 'getUserById').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'get',
      url: `/${mockGetUserResponse._id}`
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  test('04. should update a user successfully', () => {
    jest.spyOn(userService, 'updateUserById').mockResolvedValue(mockGetUserResponse);
    const req = httpMocks.createRequest({
      method: 'patch',
      url: `/${mockGetUserResponse._id}`,
      body: mockUpdateUserRequestBody
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  test('05. should update multiple users successfully', () => {
    jest.spyOn(userService, 'updateMultipleUsers').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'patch',
      url: '/',
      body: mockUpdateUserRequestBody
    });
    const res = httpMocks.createResponse();
    userController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
