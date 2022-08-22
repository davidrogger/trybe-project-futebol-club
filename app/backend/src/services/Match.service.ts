import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { InewMatch } from '../interfaces/Match.interface';

class MatchService {
  static async findMatches(inProgress: boolean | undefined): Promise<MatchModel[]> {
    const filterApplied = inProgress !== undefined ? { inProgress } : {};
    const matches = await MatchModel.findAll({
      where: filterApplied,
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
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

  static async update(match: MatchModel): Promise<void> {
    const { id } = match;
    await MatchModel.update({ ...match, inProgress: false }, { where: { id } });
  }
}

export default MatchService;
