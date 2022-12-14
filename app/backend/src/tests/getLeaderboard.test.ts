import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { matchModelMock } from './mockedData/sequelizeMock';
import { ITeamBoard } from '../interfaces/Leaderboard.interface';
import { leaderBoardAwayMock, leaderBoardHomeMock, leaderBoardMock } from './mockedData/leaderBoardMock';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;


describe('Route "/leaderboard"', () => {
  let response: Response;
  before(() => {
    stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
  });
  
  after(() => sinon.restore());
  


  describe('Route "/leaderboard/home"', () => {
    before(async () => {
      response = await chai.request(app).get('/leaderboard/home');
    });
    
    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should order the list of Home teams by its "totalPoints" follow by "totalVictories", \
    "goalsBalance", "goalsFavor", "goalsOwn"', () => {
      const allTeamsHomeBoard: ITeamBoard[] = response.body;

      allTeamsHomeBoard.forEach((team, index) => {
        expect(team.name).to.be.equal(leaderBoardHomeMock[index].name);
        expect(team.totalPoints).to.be.equal(leaderBoardHomeMock[index].totalPoints);
        expect(team.totalGames).to.be.equal(leaderBoardHomeMock[index].totalGames);
        expect(team.totalVictories).to.be.equal(leaderBoardHomeMock[index].totalVictories);
        expect(team.totalDraws).to.be.equal(leaderBoardHomeMock[index].totalDraws);
        expect(team.totalLosses).to.be.equal(leaderBoardHomeMock[index].totalLosses);
        expect(team.goalsFavor).to.be.equal(leaderBoardHomeMock[index].goalsFavor);
        expect(team.goalsOwn).to.be.equal(leaderBoardHomeMock[index].goalsOwn);
        expect(team.goalsBalance).to.be.equal(leaderBoardHomeMock[index].goalsBalance);
        expect(team.efficiency).to.be.equal(leaderBoardHomeMock[index].efficiency);
      });
    });
  });

  describe('Route /leaderboard/away', () => {
    before(async () => {
      response = await chai.request(app).get('/leaderboard/away');
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should order the list of Away teams by its "totalPoints" follow by "totalVictories", \
    "goalsBalance", "goalsFavor", "goalsOwn"', () => {
      const allTeamsAwayBoard: ITeamBoard[] = response.body;

      allTeamsAwayBoard.forEach((team, index) => {
        expect(team.name).to.be.equal(leaderBoardAwayMock[index].name);
        expect(team.totalPoints).to.be.equal(leaderBoardAwayMock[index].totalPoints);
        expect(team.totalGames).to.be.equal(leaderBoardAwayMock[index].totalGames);
        expect(team.totalVictories).to.be.equal(leaderBoardAwayMock[index].totalVictories);
        expect(team.totalDraws).to.be.equal(leaderBoardAwayMock[index].totalDraws);
        expect(team.totalLosses).to.be.equal(leaderBoardAwayMock[index].totalLosses);
        expect(team.goalsFavor).to.be.equal(leaderBoardAwayMock[index].goalsFavor);
        expect(team.goalsOwn).to.be.equal(leaderBoardAwayMock[index].goalsOwn);
        expect(team.goalsBalance).to.be.equal(leaderBoardAwayMock[index].goalsBalance);
        expect(team.efficiency).to.be.equal(leaderBoardAwayMock[index].efficiency);
      });
    });
  });

  describe('Route /leaderboard', () => {
    before(async () => {
      response = await chai.request(app).get('/leaderboard');
    });

    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should order the list of all teams by its "totalPoints" follow by "totalVictories", \
    "goalsBalance", "goalsFavor", "goalsOwn"', () => {
      const allTeamsBoard: ITeamBoard[] = response.body;

      allTeamsBoard.forEach((team, index) => {
        expect(team.name).to.be.equal(leaderBoardMock[index].name);
        expect(team.totalPoints).to.be.equal(leaderBoardMock[index].totalPoints);
        expect(team.totalGames).to.be.equal(leaderBoardMock[index].totalGames);
        expect(team.totalVictories).to.be.equal(leaderBoardMock[index].totalVictories);
        expect(team.totalDraws).to.be.equal(leaderBoardMock[index].totalDraws);
        expect(team.totalLosses).to.be.equal(leaderBoardMock[index].totalLosses);
        expect(team.goalsFavor).to.be.equal(leaderBoardMock[index].goalsFavor);
        expect(team.goalsOwn).to.be.equal(leaderBoardMock[index].goalsOwn);
        expect(team.goalsBalance).to.be.equal(leaderBoardMock[index].goalsBalance);
        expect(team.efficiency).to.be.equal(leaderBoardMock[index].efficiency);
      });
    });
  });

});
