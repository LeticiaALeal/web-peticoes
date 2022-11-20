const Peticoes = require('../controllers/peticoesController');

module.exports = {
    getPeticoes: (app) => {
        app.get('/api/peticoes', Peticoes.apiGetAllPeticoes);
    },
    getById:(app) => {
        app.get('/api/peticoes/:id', Peticoes.getById);
    },
    addPeticao: (app) => {
        app.post('/api/peticoes', Peticoes.addPeticao);
    },
    updatePeticao: (app) => {
        app.put('/api/peticoes/:id', Peticoes.updatePeticao);
    },
    deletePeticao: (app) => {
        app.delete('/api/peticoes/:id', Peticoes.deletePeticao);
    },
    authUser: (app) => {
        app.post('/api/auth', Peticoes.authUser);
    },
    signPeticao: (app) => {
        app.post('/api/sign/:id', Peticoes.signPeticao);
    },
    removeSign: (app) => {
        app.delete('/api/sign/:id', Peticoes.removeSign);
    }
}