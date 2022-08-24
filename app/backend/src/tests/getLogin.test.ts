import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

// Mock data
import {
  validUserPayload,
} from './mockedData/LoginUsersMock';

import { app } from '../app';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;

describe('Route "/login"', () => {
  let response: Response;

  before(async () => {
    stub(jwt, 'verify').callsFake(() => validUserPayload);
    response = await chai.request(app).get('/login/validate').set('authorization', 'test-token');
  });

  after(() => sinon.restore());

  describe('get Route /login/validate', () => {
  
    it('Should return the user role', () => {
      expect(response.body.role).to.be.equal('teste')
    });
  
    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    })
  });
});

