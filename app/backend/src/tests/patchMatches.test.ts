import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

import MatchModel from '../database/models/MatchModel';
import {
  matchListMocked,
  newTeamsGoals,
} from './mockedData/matchesMock';
import { matchModelMock } from './mockedData/sequelizeMock';

chai.use(chaiHttp);

const { stub } = sinon;
const { expect } = chai;

describe('route PATH /matches', () => {
  let response: Response;
  const idTest = 41;
  afterEach(() => sinon.restore());

  describe('route PATH /matches/:id/finish', () => {

    describe('When access the route with a valid match id', () => {
      const matchBefore = matchListMocked.find((match) => match.id === idTest);
      
      before(async () => {
        stub(MatchModel, 'findByPk').callsFake(matchModelMock.findByPk);
        stub(MatchModel, 'update').callsFake(matchModelMock.update);
        response = await chai.request(app).patch(`/matches/${idTest}/finish`);
      });
  
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

    })

});

describe('route PATH /matches/:id', () => {
  before(async () => {
    stub(MatchModel, 'findByPk').callsFake(matchModelMock.findByPk);
    stub(MatchModel, 'update').callsFake(matchModelMock.update);
    response = await chai.request(app).patch(`/matches/${idTest}`).send(newTeamsGoals);
  });
  
  describe('When given a valid match "id"', () => {

    it('Should response status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should change the values of "homeTeamGoals" and "awaytTeamGoals"', () => {
      const newMatchTeamsGoals = matchListMocked.find((match) => match.id === idTest);
      expect(newMatchTeamsGoals?.homeTeamGoals).to.be.equal(newTeamsGoals.homeTeamGoals);
      expect(newMatchTeamsGoals?.awayTeamGoals).to.be.equal(newTeamsGoals.awayTeamGoals);
    });
  });

  describe('When given a match "id" not found', () => {
    before(async () => {
      stub(MatchModel, 'findByPk').callsFake(matchModelMock.findByPk);
      response = await chai.request(app).patch('/matches/999');
    });

    it('Should response status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Should response message "Match not found"', () => {
      expect(response.body.message).to.be.equal('Match not found');
    });
  });
});


});