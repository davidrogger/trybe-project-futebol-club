import { Request, Response } from 'express';
import InputValidator from '../services/InputValidator.service';
import MatchService from '../services/Match.service';

class MatchController {
  static async findMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let applyFilter;
    if (inProgress) applyFilter = MatchService.filter(inProgress.toString());
    const matches = await MatchService.findMatches(applyFilter);
    res.status(200).json(matches);
  }

  static async add(req: Request, res: Response) {
    const newMatch = InputValidator.newMatch(req.body);
    const match = await MatchService.add(newMatch);
    res.status(201).json(match);
  }
}

export default MatchController;
