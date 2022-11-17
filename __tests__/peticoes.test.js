const supertest = require('supertest');
const app = require('../index');

const api = '/api/peticoes';

describe('peticao', () => {

  describe('get peticao route', () => {
    describe('get all peticoes', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
      });
    });
  });

  describe('get peticao route', () => {
    describe('get peticao by id', () => {
      it('should return a 200', async () => {
        await supertest(app).get(`${api}/637641fd812566f758852116`).expect(200);
      });
    });
  });

  describe('given the peticoes does not exist', () => {
    it('should return a 404', async () => {
      await supertest(app).get(`${api}/637641fd812566f758852115`).expect(404);
    })
  });

  // describe('post peticao route', () => {
  //   describe('save one peticao', () => {
  //     it('should return a 200', async () => {
  //       await supertest(app).post(api).send({titulo: 'Teste', descricao: 'Teste', nome: 'Teste'}).expect(200);
  //     });
  //   });
  // });

  describe('post peticao route', () => {
    it('should return a 401', async () => {
      await supertest(app).post(api).send({titulo: 'Teste', descricao: 'Teste'}).expect(401);
    });
});

describe('put peticao route', () => {
  describe('update one peticao', () => {
    it('should return a 200', async () => {
      await supertest(app).put(`${api}/637641fd812566f758852116`).send({titulo: 'Teste', descricao: 'Teste'}).expect(200);
    });
  });
});

describe('put peticao route', () => {
  it('should return a 404', async () => {
    await supertest(app).put(`${api}/637641fd812566f758852115`).send({titulo: 'Teste', descricao: 'Teste'}).expect(404);
  });
});

describe('delete peticao route', () => {
  describe('delete one peticao', () => {
    it('should return a 200', async () => {
      await supertest(app).put(`${api}/637641fd812566f758852116`).expect(200);
    });
  });
});

describe('delete movie route', () => {
    it('should return a 404', async () => {
      await supertest(app).post(`${api}/637641fd812566f758852115`).expect(404);
    });
});

});