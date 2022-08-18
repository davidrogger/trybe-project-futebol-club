import { Request, Response } from 'express';
import InputValidator from '../services/InputValidator.service';
import TeamService from '../services/Team.service';

class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAll();
    res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const id = InputValidator.id(req.params);
    const team = await TeamService.getById(id);
    res.status(200).json(team);
  }
}

export default TeamController;
