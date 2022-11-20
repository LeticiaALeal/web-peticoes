const client = require("../../config/dbConnection");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const SECRET = "Let1c1@L34l";

module.exports = class PeticaoModel {
  static async getAllPeticoes() {
    const cursor = await client.db("peticoes").collection("peticoes").find();
    const peticoes = await cursor.toArray();
    return peticoes;
  }

  static async getById(id) {
    const query = { _id: new ObjectId(id) };
    const cursor = await client
      .db("peticoes")
      .collection("peticoes")
      .findOne(query);
    return cursor;
  }

  static async addPeticao(nomeUser, data) {
    try {
      const newPeticao = {
        titulo: data.titulo,
        descricao: data.descricao,
        autor: nomeUser,
        date: new Date(),
      };
      const addedPeticao = await client
        .db("peticoes")
        .collection("peticoes")
        .insertOne(newPeticao);
      return addedPeticao;
    } catch (error) {
      console.log(`[peticaoService] Error: ${error}`);
    }
  }

  static async updatePeticao(update_id, data) {
    const id = { _id: new ObjectId(update_id) };
    const query = { $set: { titulo: data.titulo, descricao: data.descricao } };
    const findPeticao = await client.db("peticoes").collection("peticoes").findOne(id);
    if(findPeticao == null) return null;
    return await client.db("peticoes").collection("peticoes").updateOne(id, query);
  }

  static async deletePeticao(delete_id) {
    const query = { _id: new ObjectId(delete_id) };
    const findPeticao = await client.db("peticoes").collection("peticoes").findOne(query);
    if(findPeticao == null) return null;
    return await client.db("peticoes").collection("peticoes").deleteOne(query);
  }

  static async authUser(data) {
    try {
      const query = { email: data.email, pass: data.pass };
      const authenticated = await client
        .db("peticoes")
        .collection("users")
        .findOne(query);
      const token = jwt.sign({ nome: authenticated.nome }, SECRET, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.log(`[authUser] Error: ${error}`);
    }
  }

  static async signPeticao(peticaoId, nomeUser) {
    try {
      const id = { _id: new ObjectId(peticaoId) };
      const queryToUpdate = { $push: { assinatura: nomeUser } };
      const queryToFind = { _id: new ObjectId(peticaoId), assinatura: nomeUser };
      const findPeticao = await client.db("peticoes").collection("peticoes").findOne(id);
      const hasSing = await client.db("peticoes").collection("peticoes").findOne(queryToFind);

      if (hasSing != null) return hasSing;
      if(!findPeticao) return null;

      return await client.db("peticoes").collection("peticoes").updateOne(id, queryToUpdate);
    } catch (error) {
      console.log(`[authUser] Error: ${error}`);
    }
  }

  static async removeSign(peticaoId, nomeUser) {
    try {
      const id = { _id: new ObjectId(peticaoId) };
      const query = { $pull: { assinatura: nomeUser } };
      const findPeticao = await client.db("peticoes").collection("peticoes").findOne(id);

      if(!findPeticao) return null;

      return await client
        .db("peticoes")
        .collection("peticoes")
        .updateOne(id, query);
    } catch (error) {
      console.log(`[authUser] Error: ${error}`);
    }
  }
};
