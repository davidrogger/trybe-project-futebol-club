import * as express from 'express';
import 'express-async-errors';

import * as swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './doc-swagger.json';

import ErrorHandlerMiddleware from './middlewares/ErrorHandler.middleware';
import AuthRoute from './routes/Auth.route';
import LeaderboardRoute from './routes/Leaderboard.route';
import MatchRoute from './routes/Match.route';
import TeamRoute from './routes/Team.route';

const auth = new AuthRoute();
const teams = new TeamRoute();
const matches = new MatchRoute();
const leaderboard = new LeaderboardRoute();
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', auth.route);
    this.app.use('/teams', teams.route);
    this.app.use('/matches', matches.route);
    this.app.use('/leaderboard', leaderboard.route);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    this.app.use(ErrorHandlerMiddleware.response);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
