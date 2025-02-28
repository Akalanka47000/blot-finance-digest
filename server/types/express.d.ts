import Polyglot from 'node-polyglot';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      token?: string;
      /** Part of the apicache library. Used to group cache keys */
      apicacheGroup?: any;
    }
    interface Response {
      polyglot: Polyglot;
    }
  }
}

export {};
