const Peticao = require("../models/peticoesModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const SECRET = "Let1c1@L34l";

const schema = Joi.object().keys({
  titulo: Joi.string().required().min(1).max(100),
  descricao: Joi.string().required().min(1).max(500),
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().required().min(1).max(100),
  pass: Joi.string().required().min(1).max(100),
});

module.exports = class Peticoes {
  static async apiGetAllPeticoes(req, res, next) {
    try {
      const peticoes = await Peticao.getAllPeticoes();
      if (!peticoes) {
        res.status(404).json(`Não existe petição cadastrado.`);
        return;
      }
      res.status(200).json(peticoes);
    } catch (error) {
      console.log(`[getallpeticoes error] ${error}`);
      res.status(500).json({ error: error });
      return;
    }
  }

  static async getById(req, res, next) {
    try {
      const peticoes = await Peticao.getById(req.params.id);
      if (!peticoes) {
        res.status(404).json(`Petição não encontrada`);
        return;
      }
      res.status(200).json(peticoes);
    } catch (error) {
      console.log(`[getpeticao error] ${error}`);
      res.status(500).json({ error: error });
      return;
    }
  }

  static async addPeticao(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: error });
        return;
      }

      req.nome = decoded.nome;
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      const result = {
        msg: "Petição não incluída. Campos não foram preenchidos corretamente.",
        error: error.details,
      };
      res.status(404).json(result);
      return;
    }
    try {
      if (req.nome != null) {
        const addedPeticao = await Peticao.addPeticao(req.nome, req.body);
        res.status(200).json(addedPeticao);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async updatePeticao(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: error });
      }
      req.nome = decoded.nome;
    });
    try {
      if(!req.nome) return; 
      const updatePeticao = await Peticao.updatePeticao(
        req.params.id,
        req.body
      );  
      if(!updatePeticao) return res.status(404).json({ error: 'Petição não encontrada' }); 
      res.status(200).json(updatePeticao);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async deletePeticao(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: error });
      }
      req.nome = decoded.nome;
    });
    try {    
      if(!req.nome) return; 
      const deletePeticao = await Peticao.deletePeticao(req.params.id);
      if(!deletePeticao) return res.status(404).json({ error: 'Petição não encontrada' });
      res.status(200).json(deletePeticao);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async authUser(req, res, next) {
    const { error, value } = schemaLogin.validate(req.body);
    if (error) {
      const result = {
        msg: "Autenticação falhou. Campos não foram preenchidos corretamente.",
        error: error.details,
      };
      res.status(404).json(result);
      return;
    }
    try {
      const authenticated = await Peticao.authUser(req.body);
      if (!authenticated) {
        res.status(404).json(`Usuário não encontrado`);
        return;
      }
      res.status(200).json(authenticated);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async signPeticao(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: error });
      }
      req.nome = decoded.nome;
    });
    try {
      if(!req.nome) return;
      const signPeticao = await Peticao.signPeticao(req.params.id, req.nome);
      if(!signPeticao) return res.status(404).json({ error: 'Petição não encontrada' });
      res.status(200).json(signPeticao);
      
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async removeSign(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: error });
      }
      req.nome = decoded.nome;
    });
    try {
      if(!req.nome) return;
      const unsignPeticao = await Peticao.removeSign(req.params.id, req.nome);
      if(!unsignPeticao) return res.status(404).json({ error: 'Petição ou assinatura não encontrada' });
      res.status(200).json(unsignPeticao);
      
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
