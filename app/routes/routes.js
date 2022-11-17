const Peticoes = require('../controllers/peticoesController');

module.exports = {
    getPeticoes: (app) => {
        app.get('/api/peticoes', Peticoes.apiGetAllPeticoes);
    },
    getById:(app) => {
        app.get('/api/peticoes/:id', Peticoes.getById);
    },
    //falta teste automatizado
    addPeticao: (app) => {
        app.post('/api/peticoes', Peticoes.addPeticao);
    },
    updatePeticao: (app) => {
        app.put('/api/peticoes/:id', Peticoes.updatePeticao);
    },
    deletePeticao: (app) => {
        app.delete('/api/peticoes/:id', Peticoes.deletePeticao);
    },
    //falta teste automatizado
    authUser: (app) => {
        app.post('/api/auth', Peticoes.authUser);
    },
    //falta teste automatizado
    signPeticao: (app) => {
        app.post('/api/sign/:id', Peticoes.signPeticao);
    },
    //falta teste automatizado
    removeSign: (app) => {
        app.delete('/api/sign/:id', Peticoes.removeSign);
    }
}