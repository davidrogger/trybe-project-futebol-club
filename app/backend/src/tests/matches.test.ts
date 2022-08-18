import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

// import MatchModel from '../database/models/MatchModel';

const { stub } = sinon;
const { expect } = chai;

describe('route /matches', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('When route /matches is called', () => {
    beforeEach(async () => {
      response = await chai.request(app).get('/matches');
    })
    
    it('Should return response 200', () => {
      expect(response).to.have.status(200);
    });
    it('Should return a list with all matches', () => {
      expect(response.body).to.be.deep.equal([]);
    });
  })
});