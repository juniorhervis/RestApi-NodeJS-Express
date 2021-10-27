import LivroInfoSchema from "../schema/livroInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createLivroInfo(livroInfo) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    livroInfo = new LivroInfo(livroInfo)
    await livroInfo.save()
  } catch (err) {
    throw err
  }
} 

async function updateLivroInfo(livroInfo) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    await LivroInfo.findOneAndUpdate({ livroId: livroInfo.livroId }, livroInfo)
  } catch (err) {
    throw err
  }
}

async function getLivroInfo(livroId) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    return LivroInfo.findOne({ livroId }).exec()
  } catch (err) {
    throw err
  }}

async function getLivrosInfo() {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    return LivroInfo.find({}).exec()
  } catch (err) {
    throw err
  }}

async function deleteLivroInfo(livroId) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema)
    await LivroInfo.deleteOne({ livroId })
  } catch (err) {
    throw err
  }}

async function createAvaliacoes(avaliacao, livroId) {
  try {
    const livroInfo = await getLivroInfo(livroId);
    console.log(livroInfo)
    livroInfo.avaliacoes.push(avaliacao);
    await updateLivroInfo(livroInfo);
  } catch (err) {
    throw err;
  }
}

async function deleteAvaliacoes(livroId, index) {
  try {
    const livroInfo = await getLivroInfo(livroId);
    livroInfo.avaliacoes.splice(index, 1);
    await updateLivroInfo(livroInfo);
  } catch (err) {
    throw err;
  }
}

export default {
  createLivroInfo,
  updateLivroInfo,
  getLivroInfo,
  getLivrosInfo,
  deleteLivroInfo,
  createAvaliacoes,
  deleteAvaliacoes,
};
