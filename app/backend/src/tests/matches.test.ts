import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import MatchModel from '../database/models/MatchModel';
import { matchListMocked } from './mockedData/matchesMock';

chai.use(chaiHttp);

// import MatchModel from '../database/models/MatchModel';

const { stub } = sinon;
const { expect } = chai;

describe('route /matches', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('When route /matches is called', () => {
    beforeEach(async () => {
      stub(MatchModel, 'findAll').resolves(matchListMocked as unknown as MatchModel[]);
      response = await chai.request(app).get('/matches');
    })
    
    it('Should return response 200', () => {
      expect(response).to.have.status(200);
    });
    it('Should return a list with all matches', () => {
      expect(response.body).to.be.deep.equal(matchListMocked);
    });
  })
});