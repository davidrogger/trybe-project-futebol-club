import * as sinon from 'sinon';
import * as chai from 'chai';

import chaiHttp from 'chai-http';
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
      response = await chai.request(app).get('/teams');
      stub(TeamModel, 'findAll').resolves(mockedTeamList as TeamModel[]);
      expect(response).to.have.status(200);
      expect(response.body).to.be.equal(mockedTeamList);
    });
  });

  describe('When use route "/teams/id"', () => {
    it('Should get a team by its "id"', async () => {
      response = await chai.request(app).get('/teams/1');
      stub(TeamModel, 'findByPk').resolves(mockedTeam as TeamModel);
      expect(response).to.have.status(200);
      expect(response).to.be.equal(mockedTeam);
    });
  });
})