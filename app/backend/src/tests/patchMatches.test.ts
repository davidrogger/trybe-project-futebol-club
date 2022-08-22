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
  matchListMocked,
  mockUpdate,
  mockFindByPk,
} from './mockedData/matchesMock';
import { validUserPayload } from './mockedData/LoginUsersMock';
import JwtService from '../services/Jwt.service';
import { IMatchModelAssociated } from './mockedData/matchesMock';

chai.use(chaiHttp);

const { stub } = sinon;
const { expect } = chai;

let response: Response;
const idTest = 41;
const matchBefore = matchListMocked.find((match) => match.id === idTest);

before(async () => {
  stub(MatchModel, 'update').callsFake(mockUpdate);
  stub(MatchModel, 'findByPk').callsFake(mockFindByPk);
  response = await chai.request(app).patch(`/matches/${idTest}/finish`);
});

after(() => sinon.restore());

describe('route /matches/:id/finish', () => {

  it('Should response status 200', () => {
    expect(response).to.have.status(200);
  })

  it('Should return a message "Finished"', () => {
    expect(response.body.message).to.be.equal('Finished');
  });

  it('Should change a match progress to false', () => {
    const matchAfter = matchListMocked.find((match) => match.id === idTest);
    expect(matchBefore?.inProgress).to.be.equal(true);
    expect(matchAfter?.inProgress).to.be.equal(false);

  });

});