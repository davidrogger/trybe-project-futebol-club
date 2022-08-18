import ITeam from '../interfaces/ITeams';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();
    return teams as ITeam[];
  }
}

export default TeamService;
