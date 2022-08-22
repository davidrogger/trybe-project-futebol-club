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

export const matchListMocked: IMatchModelAssociated[] = [
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

export const notAllowMatchTeam = {
  "homeTeam": 1,
  "awayTeam": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
};

export async function mockFindOne(data: any): Promise<MatchModel[]> {
  const { where } = data;
    if (Object.values(where).length > 0) {
      return matchListMocked.filter((match) => match.inProgress === where.inProgress) as unknown as MatchModel[];
    }
  return matchListMocked as unknown as MatchModel[];
}

export async function  mockCreate(newData: any): Promise<MatchModel> {
  const lastMatchIndex = matchListMocked.length - 1;
  const newId = matchListMocked[lastMatchIndex].id + 1; // durante os testes não existe a possaibilidade de deletar campos

  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newData;

if ([homeTeam, awayTeam, homeTeamGoals, awayTeamGoals]
    .includes(undefined)) throw new Error('Invalid column');

  const newMatch = { id: newId, ...newData, inProgress: true };

  matchListMocked.push(newMatch);
  return newMatch as MatchModel;
}

export async function  mockFindByPk(id: any) {
  const match = matchListMocked.find((match) => match.id === id);
  return match as unknown as MatchModel;
}

export async function mockUpdate(update: any, data:any) {
  const { where } = data;
  const { id } = where;
  const indexToUpdated = matchListMocked.findIndex((match) => match.id === id);
  matchListMocked.splice(indexToUpdated, 1, update);
  return update;
}