const app = require('../backend/app');
const connectDatabase = require('./db/database.js');

//Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/config.env',
  });
}
//database connected
// connectDatabase();

//create server
const server = app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server is running ${process.env.PORT}`);
  }
});

//unhandled promise rejection

process.on('unhandledRejection', (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
