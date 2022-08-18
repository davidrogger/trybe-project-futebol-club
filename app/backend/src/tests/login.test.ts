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
  validUserData,
} from './mockedData/LoginUsersMock';

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/IUser.interface';
import bCryptService from '../services/PasswordHash.service';
import JwtService from '../services/Jwt.service';

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
    let response: Response;
    afterEach(() => sinon.restore());

    describe('When the user is authorized', async () => {
      beforeEach( async() => {
        stub(UserModel, 'findOne').resolves(validUserData as UserModel);
        stub(bCryptService, 'verify').returns(true);
        stub(JwtService, 'generateToken').returns('valid-token');
        response = await chai.request(app).post('/login').send(authorizedValidUser);
      });
      
      it('Should return status 200', () => {
        expect(response).to.have.status(200)
      })
      it('Should give a token', () => {
        expect(response.body.token).to.be.equal('valid-token')
      })
    })
  });
});
