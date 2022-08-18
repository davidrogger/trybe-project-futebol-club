import MatchModel from '../database/models/MatchModel';

class MatchService {
  static async getAll() {
    const matches = await MatchModel.findAll();
    return matches;
  }
}

export default MatchService;
