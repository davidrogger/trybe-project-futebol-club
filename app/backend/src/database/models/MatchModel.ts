import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchModel.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: INTEGER,
    },
    awayTeam: {
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: INTEGER,
    },
    inProgress: {
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'matches',
    tableName: 'matches',
  },
);

MatchModel.hasOne(TeamModel, { foreignKey: 'id', as: 'teamHome', sourceKey: 'homeTeam' });
MatchModel.hasOne(TeamModel, { foreignKey: 'id', as: 'teamAway', sourceKey: 'awayTeam' });

export default MatchModel;
