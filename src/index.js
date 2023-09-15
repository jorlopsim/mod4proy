import app from './app.js';
import 'dotenv/config.js';
import { sequelize } from './database/database.js';
import logger from './logs/logger.js';

async function main() {
    console.clear();
    await sequelize.sync({ force: false});
    const PORT = process.env.PORT;
    app.listen(PORT);
    logger.info(`Server on port ${PORT}`);
    //console.log(PORT);
  }
main();