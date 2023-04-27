import logger from './utils/logger';
import { AppServer } from './app';

const app = new AppServer();

app.app.listen(3000, () => {
  logger.info(`Server started on port ${3000}`);
});
