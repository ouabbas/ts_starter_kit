import config from 'config';
import { dbConfig } from '~interfaces/db.interface';

// const { host, port, database }: dbConfig = config.get('dbConfig');
const { DATABASE_USER, DATABASE_PASSWORD } = process.env;

export const dbConnection = {
  // url: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@clustername.f5klj.mongodb.net/database?retryWrites=true&w=majority`,
  url: `mongodb://127.0.0.1:27017/ipssi`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
