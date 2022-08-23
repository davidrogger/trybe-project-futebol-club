import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { matchModelMock } from './mockedData/sequelizeMock';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;

describe('Route "/leaderboard"', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('Route "/leaderboard/home"', () => {
    before(async () => {
      stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
      response = await chai.request(app).get('/leaderboard/home');
    });
    
    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });
  });
  
});
