import LivroRepository from "../repositories/livro.repository.js";
import AutorRepository from "../repositories/autor.repository.js";
import VendaRepository from "../repositories/venda.repository.js";
import LivroInfoRepository from "../repositories/livroInfo.repository.js";
import livroInfoRepository from "../repositories/livroInfo.repository.js";
import livroRepository from "../repositories/livro.repository.js";

async function createLivro(livro) {
  if (await AutorRepository.getAutor(livro.autorId)) {
    return await LivroRepository.insertLivro(livro);
  }
  throw new Error("O Autor ID informado não existe!");
}
async function getLivros() {
  return await LivroRepository.getLivros();
}

async function getLivro(id) {
  const livro = await LivroRepository.getLivro(id);
  livro.info = await LivroInfoRepository.getLivroInfo(parseInt(id));
  return livro;
}

async function deleteLivro(id) {
  const vendas = await VendaRepository.getVendasByLivroId(id);
  if (vendas.length > 0) {
    throw new Error("Esse produto possui vendas, não é possível excluí-lo!");
  }
  await LivroRepository.deleteLivro(id);
}

async function updateLivro(livro) {
  if (await AutorRepository.getAutor(livro.autorId)) {
    return await LivroRepository.updateLivro(livro);
  }
  throw new Error("O Autor ID informado não existe!");
}

async function createLivroInfo(livroInfo) {
  await LivroInfoRepository.createLivroInfo(livroInfo);
}

async function updateLivroInfo(livroInfo) {
  await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function createAvaliacoes(avaliacao, livroId) {
  await LivroInfoRepository.createAvaliacoes(avaliacao, livroId);
}

async function deleteAvaliacoes(livroId, index) {
  await LivroInfoRepository.deleteAvaliacoes(parseInt(livroId), index);
}

async function getLivrosInfo() {
  return await livroInfoRepository.getLivrosInfo();
}

async function deleteLivroInfo(id) {
  await LivroInfoRepository.deleteLivroInfo(id)
}

export default {
  createLivro,
  getLivros,
  getLivro,
  deleteLivro,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  createAvaliacoes,
  deleteAvaliacoes,
  getLivrosInfo,
  deleteLivroInfo
};
