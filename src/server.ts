process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '~app';
import AuthRoute from '~routes/auth.route';
import IndexRoute from '~routes/index.route';
import UsersRoute from '~routes/users.route';
import WaitingListRoute from '~routes/waiting-list.route';
import validateEnv from '~utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new UsersRoute(), new WaitingListRoute()]);

app.listen();
