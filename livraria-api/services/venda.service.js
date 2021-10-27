import VendaRepository from "../repositories/venda.repository.js";
import ClienteRepository from "../repositories/cliente.repository.js";
import LivroRepository from "../repositories/livro.repository.js";
import livroRepository from "../repositories/livro.repository.js";

async function createVenda(venda) {
  let error = "";
  if (!(await ClienteRepository.getCliente(venda.clienteId))) {
    error = "Cliente ID informado não existe!";
  }
  const livro = await LivroRepository.getLivro(venda.livroId);
  if (!livro) {
    error += "Livro ID informado não existe!";
  }
  if (error) {
    throw new Error(error);
  }

  if (livro.estoque > 0) {
    venda = await VendaRepository.insertVenda(venda);
    livro.estoque--;
    await LivroRepository.updateLivro(livro);
    return venda;
  } else {
    throw new Error("O produto informado não está disponível em estoque!");
  }
}

async function getVendas(livroId, autorId) {
  if (livroId) {
    return await VendaRepository.getVendasByLivroId(livroId);
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutorId(autorId)
  }
  return await VendaRepository.getVendas();
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id);
}

async function deleteVenda(id) {
  const venda = await VendaRepository.getVenda(id);
  if (venda) {
    const livro = await LivroRepository.getLivro(venda.livroId);
    await VendaRepository.deleteVenda(id);
    livro.estoque++;
    await livroRepository.updateLivro(livro);
  } else {
    throw new Error("O ID de venda informado não existe!");
  }
}

async function updateVenda(venda) {
  let error = "";
  if (!(await ClienteRepository.getCliente(venda.clienteId))) {
    error = "Cliente ID informado não existe!";
  }
  const livro = await LivroRepository.getLivro(venda.livroId);
  if (!livro) {
    error += "Livro ID informado não existe!";
  }
  if (error) {
    throw new Error(error);
  }
  return await VendaRepository.updateVenda(venda);
}

export default {
  createVenda,
  getVendas,
  getVenda,
  deleteVenda,
  updateVenda,
};
