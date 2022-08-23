import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import MatchModel from '../database/models/MatchModel';
import {
  matchListMocked,
} from './mockedData/matchesMock';
import { matchModelMock } from './mockedData/sequelizeMock';
import { IMatchModelAssociated } from '../interfaces/Match.interface';

chai.use(chaiHttp);

const { stub } = sinon;
const { expect } = chai;

describe('route /matches', () => {
  let response: Response;

  afterEach(() => sinon.restore());

    describe('When route /matches is called whitout a query filter', () => {
      beforeEach(async () => {
        stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
        response = await chai.request(app).get('/matches');
      })
      
      it('Should return response 200', () => {
        expect(response).to.have.status(200);
      });
      it('Should return a list with all matches', () => {
        expect(response.body).to.be.deep.equal(matchListMocked);
      });
    });
  
    describe('When route /matches is called with a query filter true', () => {
      beforeEach(async () => {
        stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
        response = await chai.request(app).get('/matches?inProgress=true');
      })
  
      it('Should return response 200', () => {
        expect(response).to.have.status(200);
      });
      it('Should return a list with just the matches inProgress true', () => {
        const matchesInProgress: IMatchModelAssociated[] = response.body;
        matchesInProgress.forEach((match) => {
          expect(match.inProgress).to.be.equal(true);
        });
      });
    });
  
    describe('When route /matches is called with a query filter false', () => {
      beforeEach(async () => {
        stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
        response = await chai.request(app).get('/matches?inProgress=false');
      })
      it('Should return response 200', () => {
        expect(response).to.have.status(200);
      });
      it('Should return a list with just the matches inProgress false', () => {
        const matchesInProgress: IMatchModelAssociated[] = response.body;
        matchesInProgress.forEach((match) => {
          expect(match.inProgress).to.be.equal(false);
        });
      });
    })

});