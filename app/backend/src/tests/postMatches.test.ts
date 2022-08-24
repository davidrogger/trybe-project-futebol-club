import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import MatchModel from '../database/models/MatchModel';
import {
  newMatchTest,
  notAllowMatchTeamEqual,
  notAllowMatchTeamNonExistent1,
} from './mockedData/matchesMock';
import { validUserPayload } from './mockedData/LoginUsersMock';
import JwtService from '../services/Jwt.service';
import TeamModel from '../database/models/TeamModel';
import { matchModelMock, teamModelMock } from './mockedData/sequelizeMock';

chai.use(chaiHttp);

const { stub } = sinon;
const { expect } = chai;

describe('route /matches', () => {
  let response: Response;

  afterEach(() => sinon.restore());

    describe('When route matches is called with a valid token', () => {
      before(async () => {
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

    describe('When route matches is called without a token', () => {
      before(async () => {
        response = await chai
          .request(app)
          .post('/matches')
          .send(newMatchTest);
      });

      it('Should response status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should response message "Missing Token', () => {
        expect(response.body.message).to.be.equal('Missing Token');
      });
    });

    describe('When route matches is called with all fields and a valid token', () => {
      before( async () => {
        stub(JwtService, 'verifyToken').returns(validUserPayload);
        stub(MatchModel, 'create').callsFake(matchModelMock.create);
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

    describe('When the teams in a match are the same', () => {
      before(async () => {
        stub(JwtService, 'verifyToken').returns(validUserPayload);
        stub(MatchModel, 'create').callsFake(matchModelMock.create);
        response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', 'test-token')
          .send(notAllowMatchTeamEqual);
      });

      it('Should response status 401', () => {
        expect(response).to.have.status(401);
      });

      it('Should response message "It is not possible to create a \
      match with two equal teams"', () => {
        expect(response.body.message).to.be.equal(
          'It is not possible to create a match with two equal teams');
      });
    });

    describe('When a team add to the match not exist in the database', () => {
      before(async () => {
        stub(JwtService, 'verifyToken').returns(validUserPayload);
        stub(TeamModel, 'findByPk').callsFake(teamModelMock.findByPk)
        response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', 'test-token')
          .send(notAllowMatchTeamNonExistent1);
      });

      it('Should return status 404', () => {
        expect(response).to.have.status(404);
      });

      it('Should return message "There is no team with such id!"', () => {
        expect(response.body.message).to.be.equal('There is no team with such id!');
      });

    });
});