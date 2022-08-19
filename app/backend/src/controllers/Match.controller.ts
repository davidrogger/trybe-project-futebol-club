import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

class MatchController {
  static async findMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let applyFilter;
    if (inProgress) applyFilter = MatchService.filter(inProgress.toString());
    const matches = await MatchService.findMatches(applyFilter);
    res.status(200).json(matches);
  }
}

export default MatchController;
