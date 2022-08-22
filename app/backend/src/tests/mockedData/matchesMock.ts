import MatchModel from "../../database/models/MatchModel";

export interface IMatchModelAssociated {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string,
  }
}

export const matchListMocked = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
]

export const newMatchTest = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export const notAllowMatchTeamEqual = {
  "homeTeam": 1,
  "awayTeam": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export const notAllowMatchTeamNonExistent1 = {
  "homeTeam": 111,
  "awayTeam": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export const notAllowMatchTeamNonExistent2 = {
  "homeTeam": 1,
  "awayTeam": 222,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export const newTeamsGoals = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
