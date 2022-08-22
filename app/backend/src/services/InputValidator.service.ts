import { IncomingHttpHeaders } from 'http';
import { ParamsDictionary } from 'express-serve-static-core';
import InvalidInputError from '../errors/InvalidInputError';
import UnauthorizedError from '../errors/UnauthorizedError';
import MissingFieldError from '../errors/MissingFieldError';
import IUserLogin from '../interfaces/IUserLogin';
import { InewMatch, ITeamGoals } from '../interfaces/Match.interface';

class InputValidator {
  static login(userLogin: IUserLogin): IUserLogin {
    if (!userLogin.email || !userLogin.password) {
      throw new MissingFieldError('All fields must be filled');
    }
    return userLogin;
  }

  static token({ authorization }: IncomingHttpHeaders): string {
    if (!authorization) throw new UnauthorizedError('Missing Token');
    return authorization;
  }

  static id({ id }: ParamsDictionary): number {
    const numberId = Number(id);
    const numberData = Number.isNaN(numberId);
    if (numberData) throw new InvalidInputError('Id must be a number');
    return numberId;
  }

  static newMatch(match: InewMatch): InewMatch {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }

    return { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
  }

  static newGoals(goals: ITeamGoals): ITeamGoals {
    const { homeTeamGoals, awayTeamGoals } = goals;
    return { homeTeamGoals, awayTeamGoals };
  }
}

export default InputValidator;
