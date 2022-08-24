import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

import TeamModel from '../database/models/TeamModel';
import { mockedTeam, mockedTeamList } from './mockedData/TeamMock';
import { teamModelMock } from './mockedData/sequelizeMock';

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

    describe('When the id is fullfilled correcly' , () => {
      before(async () => {
        stub(TeamModel, 'findByPk').callsFake(teamModelMock.findByPk);
        response = await chai.request(app).get('/teams/1');
      });

      it('Should response 200', () => {
        expect(response).to.have.status(200);
      });
      it('Should show the team related to that id', async () => {        
        expect(response.body).to.be.deep.equal(mockedTeam);
      });
    });

    describe('When the id is fullfilled wrongly', () => {
      before(async () => {
        response = await chai.request(app).get('/teams/a');
      });

      it('Should response status 400', () => {
        expect(response).to.have.status(400);
      });

      it('Should response "Id must be a number"', () => {
        expect(response.body.message).to.be.equal('Id must be a number');
      });

    });

    describe('When the id dont exists in the database', () => {
      before(async () => {
        stub(TeamModel, 'findByPk').callsFake(teamModelMock.findByPk);
        response = await chai.request(app).get('/teams/100');
      });

      it('Should return status 404', () => {
        expect(response).to.have.status(404);
      });

      it('Should return message "There is no team with such id!"', () => {
        expect(response.body.message).to.be.equal('There is no team with such id!');
      });
    });
  });
})