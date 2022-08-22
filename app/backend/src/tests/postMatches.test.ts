import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import MatchModel from '../database/models/MatchModel';
import {
  newMatchTest,
  mockCreate,
} from './mockedData/matchesMock';
import { validUserPayload } from './mockedData/LoginUsersMock';
import JwtService from '../services/Jwt.service';

chai.use(chaiHttp);

const { stub } = sinon;
const { expect } = chai;

describe('route /matches', () => {
  let response: Response;

  afterEach(() => sinon.restore());

    describe('When route matches is called without a token or a valid token', () => {
      beforeEach( async () => {
        response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', 'invalid-token')
          .send(newMatchTest);
      });

      it('Should response status 401', () => {
        expect(response).to.have.status(401)
      });

      it('Should response "Token must be a valid token"', () => {
        expect(response.body.message).to.be.equal('Token must be a valid token');
      });

    });

    describe('When route matches is called with all fields and a valid token', () => {
      beforeEach( async () => {
        stub(JwtService, 'verifyToken').returns(validUserPayload);
        stub(MatchModel, 'create').callsFake(mockCreate);
        response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', 'test-token')
          .send(newMatchTest);
      });

      it('Should response status 201', () => {
        expect(response).to.have.status(201);
      });

      it('Should return the new match with its "ID" and progress "true"', () => {
        const newMatchData = response.body;
        expect(newMatchData).to.be.contain
          .keys('id', 'homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals', 'inProgress');
        expect(newMatchData.inProgress).to.be.true;
      });

    });

});