import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAll();
    res.status(200).json(teams);
  }
}

export default TeamController;
