const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.getPeticoes(app);
routes.getById(app);
routes.addPeticao(app);
routes.updatePeticao(app);
routes.deletePeticao(app);
routes.authUser(app);
routes.signPeticao(app);
routes.removeSign(app);

module.exports = app;