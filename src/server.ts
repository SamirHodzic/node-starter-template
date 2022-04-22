import errorHandler from 'errorhandler';
import * as http from 'http';
import app from './app';
import { NODE_ENV } from './config/secrets';

if (NODE_ENV === 'development') {
  app.use(errorHandler());
}

const httpServer = new http.Server(app);

const server = httpServer.listen(app.get('port'), () => {
  console.info(
    'Service is running on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

export default server;