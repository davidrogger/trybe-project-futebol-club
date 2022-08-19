import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

class MatchService {
  static async findMatches(inProgress: boolean | undefined): Promise<MatchModel[]> {
    const filterApplied = inProgress ? { inProgress } : {};
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
}

export default MatchService;
