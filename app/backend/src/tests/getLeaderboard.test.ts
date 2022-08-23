import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { matchModelMock } from './mockedData/sequelizeMock';
import { ITeamBoard } from '../interfaces/Leaderboard.interface';
import { leaderBoardHomeMock } from './mockedData/leaderBoardMock';

chai.use(chaiHttp);

const { expect } = chai;
const { stub } = sinon;

describe('Route "/leaderboard"', () => {
  let response: Response;
  afterEach(() => sinon.restore());

  describe('Route "/leaderboard/home"', () => {
    before(async () => {
      stub(MatchModel, 'findAll').callsFake(matchModelMock.findAll);
      response = await chai.request(app).get('/leaderboard/home');
    });
    
    it('Should return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Should return a list with a pattern display fields', () => {
      const allTeamsBoard = response.body;
      expect(allTeamsBoard[0]).to.includes.keys(
        'name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws',
        'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency',
        );
    })

    it('Should order the list by its "totalPoints" follow by "totalVictories", \
    "goalsBalance", "goalsFavor", "goalsOwn"', () => {
      const allTeamsBoard: ITeamBoard[] = response.body;

      allTeamsBoard.forEach((team, index) => {
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
  
});
