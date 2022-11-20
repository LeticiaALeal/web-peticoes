const supertest = require('supertest');
const app = require('../index');

const api = '/api/peticoes';
const apiAuth = '/api/auth';
const apiSign = '/api/sign';
var token = "";
var peticao = "";

// TESTE DE AUTENTICAÇÃO
describe('auth', () => {

  describe('create jwt token', () => {
    describe('auth user', () => {
      it('should return a 200', async () => {
        await supertest(app).post(apiAuth).send({email: 'beltrano@souza.com', pass: 'beltrano123'})
        .expect(200).then((rest) => {
        token = rest.body;
        });
      });
    });
  });

  describe('invalid authentication', () => {
    it('should return a 404', async () => {
      await supertest(app).post(apiAuth).send({email: 'beltrano@souza.com', pass: 'beltrano124'}).expect(404)
  });
});

});


// TESTES DE INCLUSÃO, ALTERAÇÃO, CONSULTA E BUSCA DE PETIÇÕES
describe('peticao', () => {

  // Busca todas as petições
  describe('get peticao route', () => {
    describe('get all peticoes', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
      });
    });
  });

  // Inserir petição
  describe('post peticao route', () => {
    describe('save one peticao', () => {
      it('should return a 200', async () => {
        await supertest(app).post(api).set('x-access-token', token).send({titulo: 'Teste', descricao: 'Teste'})
        .expect(200).then((rest) => {
          peticao = rest.body.insertedId;
          });
      });
    });
  });

  describe('post peticao route', () => {
    it('should return a 401', async () => {
      await supertest(app).post(api).send({titulo: 'Teste', descricao: 'Teste'}).expect(401);
    });
});
describe('post peticao route', () => {
  it('should return a 40', async () => {
    await supertest(app).post(api).set('x-access-token', token).send({titulo: 'Teste'}).expect(404);
  });
});

  // Consulta petição por id
  describe('get peticao route', () => {
    describe('get peticao by id', () => {
      it('should return a 200', async () => {
        await supertest(app).get(`${api}/`+peticao).expect(200);
      });
    });
  });

  describe('given the peticoes does not exist', () => {
    it('should return a 404', async () => {
      await supertest(app).get(`${api}/637641fd812566f758852115`).expect(404);
    })
  });

// Editar petição
describe('put peticao route', () => {
  describe('update one peticao', () => {
    it('should return a 200', async () => {
      await supertest(app).put(`${api}/`+peticao).set('x-access-token', token).send({titulo: 'Teste 2', descricao: 'Teste 2'}).expect(200);
    });
  });
});

describe('put peticao route', () => {
  it('should return a 404', async () => {
    await supertest(app).put(`${api}/637641fd812566f758852115`).set('x-access-token', token).send({titulo: 'Teste', descricao: 'Teste'}).expect(404);
  });
});

describe('put peticao route', () => {
  it('should return a 401', async () => {
    await supertest(app).put(`${api}/`+peticao).send({titulo: 'Teste 2', descricao: 'Teste 2'}).expect(401);
  });
});

// TESTES DE ASSINATURA E REMOÇÃO DE ASSINATURA
  // Assinatura de petição
  describe('sign petition', () => {
    describe('sign petition with authentication ', () => {
      it('should return a 200', async () => {
        await supertest(app).post(`${apiSign}/`+peticao).set('x-access-token', token).expect(200);
      });
    });
  });

  describe('invalid authentication', () => {
    it('should return a 401', async () => {
      await supertest(app).post(`${apiSign}/`+peticao).expect(401);
  }); 
});

describe('invalid peticao', () => {
  it('should return a 404', async () => {
    await supertest(app).post(`${apiSign}/637641fd812566f758852115`).set('x-access-token', token).expect(404);
  });
});

// Remoção de assinatura de petição
describe('remove sign petition', () => {
  describe('remove sign petition with authentication ', () => {
    it('should return a 200', async () => {
      await supertest(app).delete(`${apiSign}/`+peticao).set('x-access-token', token).expect(200);
    });
  });
});

describe('invalid authentication', () => {
  it('should return a 401', async () => {
    await supertest(app).delete(`${apiSign}/`+peticao).expect(401);
}); 
});

describe('invalid peticao', () => {
  it('should return a 404', async () => {
    await supertest(app).delete(`${apiSign}/637641fd812566f758852115`).set('x-access-token', token).expect(404);
  });
});

// TESTES DE DELEÇÃO DE PETIÇÃO
// Deletar petição
describe('delete peticao route', () => {
  it('should return a 401', async () => {
    await supertest(app).delete(`${api}/`+peticao).expect(401);
  });
});

describe('delete peticao route', () => {
  it('should return a 404', async () => {
    await supertest(app).delete(`${api}/637641fd812566f758852115`).set('x-access-token', token).expect(404);
  });
});

describe('delete peticao route', () => {
  describe('delete one peticao', () => {
    it('should return a 200', async () => {
      await supertest(app).delete(`${api}/`+peticao).set('x-access-token', token).expect(200);
    });
  });
});

});

