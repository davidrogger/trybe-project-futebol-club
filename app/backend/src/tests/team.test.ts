import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

import TeamModel from '../database/models/TeamModel';
import { mockedTeam, mockedTeamList } from './mockedData/TeamMock';

const { stub } = sinon;
const { expect } = chai;

describe('route /teams', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('When use route "/teams"', () => {
    it('Should get all teams', async () => {
      stub(TeamModel, 'findAll').resolves(mockedTeamList as TeamModel[]);
      response = await chai.request(app).get('/teams');
      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(mockedTeamList);
    });
  });

  describe('When use route "/teams/id"', () => {
    it('Should get a team by its "id"', async () => {
      stub(TeamModel, 'findByPk').resolves(mockedTeam as TeamModel);
      response = await chai.request(app).get('/teams/1');
      expect(response).to.have.status(200);
      expect(response.body).to.be.deep.equal(mockedTeam);
    });
  });
})