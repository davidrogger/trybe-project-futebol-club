import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

// Mock data
import {
  invalidUser1,
  invalidUser2,
  invalidUser3,
  authorizedValidUser,
  unauthorizedValidUser } from './mockedData/LoginUsersMock';

import { app } from '../app';
import UserModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;

describe('Route "/login"', () => {
  describe('When missing a field in the body request', () => {
    let response: Response;
    const userInvalidsLogin = [invalidUser1, invalidUser2, invalidUser3]

    it('Should return "All fields must be filled"', async () => {
      await Promise.all(userInvalidsLogin.map(async (invalidUser) => {
        response = await chai.request(app).post('/login').send(invalidUser);
        expect(response.body.message).to.be.equal('All fields must be filled');
      }));
    })
    it('Should have a response status 400', async () => {
      await Promise.all(userInvalidsLogin.map(async (invalidUser) => {
        response = await chai.request(app).post('/login').send(invalidUser);
        expect(response).to.have.status(400);
        expect(response).not.to.have.status(404);
      }));
    })
  })

  describe('When all the fields are fulfilled', () => {
    let response;
    before(async () => {
      stub(UserModel, 'findByPk').resolves()
    });

    describe('When the user is authorized', async () => {
      response = await chai.request(app).post('/login').send(authorizedValidUser);
      it('Should return status 200', () => {
        expect(response).to.have.status(200)
      })
      it('Should give a token', () => {
        expect(response.body.message).to.be.equal('valid-token')
      })
    })
  });
});
