import { Request, Response } from 'express';
import TeamService from '../services/Team.service';
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
    await Promise.all([
      TeamService.getById(newMatch.awayTeam),
      TeamService.getById(newMatch.homeTeam),
    ]);
    const match = await MatchService.add(newMatch);
    res.status(201).json(match);
  }

  static async updateProgress(req: Request, res: Response) {
    const id = InputValidator.id(req.params);
    const match = await MatchService.findMatchById(id);
    await MatchService.updateProgress(match);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateGoals(req: Request, res: Response) {
    const id = InputValidator.id(req.params);
    const newGoals = InputValidator.newGoals(req.body);
    const match = await MatchService.findMatchById(id);
    await MatchService.updateGoals(match, newGoals);
    res.status(200).json({ updated: { ...match, ...newGoals } });
  }
}

export default MatchController;
