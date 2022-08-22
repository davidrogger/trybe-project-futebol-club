// I used as a base of this refactor an exercise/practice from the block 24.4 from the trybe course
import { Model } from "sequelize";
import { matchListMocked } from "./matchesMock";
import { mockedTeamList } from "./TeamMock";

export async function mockFindAll(db: any[], search: any): Promise<Model[]> {
  const { where } = search;
    if (Object.values(where).length > 0) {
      return db
        .filter((match) => match.inProgress === where.inProgress) as unknown as Model[];
    }
  return db as unknown as Model[];
}

export async function  mockCreate(db: any[], newData: any): Promise<Model> {
  const lastMatchIndex = db.length - 1;
  const newId = db[lastMatchIndex].id + 1; // durante os testes não existe a possibilidade de deletar campos

  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newData;

if ([homeTeam, awayTeam, homeTeamGoals, awayTeamGoals]
    .includes(undefined)) throw new Error('Invalid column');

  const newMatch = { id: newId, ...newData, inProgress: true };

  db.push(newMatch);
  return newMatch as Model;
}

export async function  mockFindByPk(db: any[], id: any) {
  const match = db.find((match) => match.id === id) as Model || null;
  return match;
}

export async function mockUpdate(db: any[], update: any, search:any) {
  const { where } = search;
  const { id } = where;
  const indexToUpdated = db.findIndex((match) => match.id === id);
  db.splice(indexToUpdated, 1, update);
  return update;
}

export const teamModelMock = {
  findByPk: async (id: any) => mockFindByPk(mockedTeamList, id),
};

export const matchModelMock = {
  findByPk: async (id: any) => mockFindByPk(matchListMocked, id),
  update: async (update: any, data: any) => mockUpdate(matchListMocked, update, data),
  create: async (newData: any) => mockCreate(matchListMocked, newData),
  findAll: async (search: any) => mockFindAll(matchListMocked, search),
}