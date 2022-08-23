import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatchModelAssociated, InewMatch, ITeamGoals } from '../interfaces/Match.interface';

class MatchService {
  static async findMatches(inProgress: boolean | undefined) {
    const filterApplied = inProgress !== undefined ? { inProgress } : {};
    const matches = await MatchModel.findAll({
      where: filterApplied,
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches as IMatchModelAssociated[];
  }

  static filter(progress: string): boolean {
    return progress === 'true';
  }

  static async add(newMatch: InewMatch): Promise<MatchModel> {
    const match = await MatchModel.create(newMatch);
    return match;
  }

  static async findMatchById(id: number): Promise<MatchModel> {
    const match = await MatchModel.findByPk(id);
    if (!match) throw new Error('Match not found');
    return match;
  }

  static async updateProgress(match: MatchModel): Promise<void> {
    const { id } = match;
    await MatchModel.update({ ...match, inProgress: false }, { where: { id } });
  }

  static async updateGoals(match: MatchModel, newGoals: ITeamGoals): Promise<void> {
    const { id } = match;
    await MatchModel.update({ ...match, ...newGoals }, { where: { id } });
  }
}

export default MatchService;
