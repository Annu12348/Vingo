import app from './src/app.js'
import { config } from './src/config/config.js';
import connectDataBase from './src/db/db.js';
import debug from 'debug';
const debuglog = debug("development:server")

connectDataBase()

app.listen(config.PORT || 3000, () => {
    console.log(`Server is running on port ${config.PORT}`);
});