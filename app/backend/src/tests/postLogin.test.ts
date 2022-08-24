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
  unauthorizedValidUser,
} from './mockedData/LoginUsersMock';

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;

describe('Route "/login"', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('When missing a field in the body request', () => {
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

    describe('When the user is authorized', async () => {
      before( async() => {
        stub(UserModel, 'findOne').resolves(validUserData as UserModel);
        stub(bcrypt, 'compareSync').returns(true);
        stub(jwt, 'sign').callsFake(() => 'valid-token');
        response = await chai.request(app).post('/login').send(authorizedValidUser);
      });
      
      it('Should return status 200', () => {
        expect(response).to.have.status(200)
      })
      it('Should give a token', () => {
        expect(response.body.token).to.be.equal('valid-token')
        expect(response.body.token).not.to.be.equal('valid-tokena')
      })
    })

    describe('When the user is unauthorized by password', async () => {
      before( async() => {
        stub(UserModel, 'findOne').resolves(unauthorizedValidUser as UserModel);
        stub(bcrypt, 'compareSync').returns(false);
        response = await chai.request(app).post('/login').send(unauthorizedValidUser);
      });
      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });
      it('Should return "Incorrect email or password"', async () => {
        expect(response.body.message).to.be.equal('Incorrect email or password')
      })
    });

    describe('When the user is unauthorized by email', async () => {
      before( async() => {
        stub(UserModel, 'findOne').resolves(null);
        response = await chai.request(app).post('/login').send(unauthorizedValidUser);
      });
      it('Should return status 401', () => {
        expect(response).to.have.status(401);
      });
      it('Should return "Incorrect email or password"', async () => {
        expect(response.body.message).to.be.equal('Incorrect email or password')
      })
    });
  });
});

