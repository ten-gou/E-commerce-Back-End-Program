const seed = require('./seeds');
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
//app.listen(PORT, () => {
//  console.log(`App listening on port ${PORT}!`);
//});

// sequelize compatible version
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});