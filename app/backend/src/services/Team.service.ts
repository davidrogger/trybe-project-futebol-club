import ITeam from '../interfaces/ITeams';
import TeamModel from '../database/models/TeamModel';
import NotFoundError from '../errors/NotFoundError';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();
    return teams as ITeam[];
  }

  static async getById(id: number): Promise<ITeam> {
    const team = await TeamModel.findByPk(id);
    if (!team) throw new NotFoundError('Team not found');
    return team as ITeam;
  }
}

export default TeamService;
