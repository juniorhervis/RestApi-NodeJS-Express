import VendaService from "../services/venda.service.js";
async function createVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.valor) {
      throw new Error("Valor é obrigatório!");
    }
    if (!venda.data) {
      throw new Error("Data é obrigatório!");
    }
    if (!venda.clienteId) {
      throw new Error("Cliente ID é obrigatório!");
    }
    if (!venda.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    res.send(await VendaService.createVenda(venda));
    res.send({});
    logger.info(`POST /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

async function getVendas(req, res, next) {
  try {
    res.send(await VendaService.getVendas(req.query.livroId, req.query.autorId));
    logger.info("GET /venda");
  } catch (err) {
    next(err);
  }
}

async function getVenda(req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id));
    logger.info("GET /venda");
  } catch (err) {
    next(err);
  }
}

async function deleteVenda(req, res, next) {
  try {
    await VendaService.deleteVenda(req.params.id);
    res.end();
    logger.info("DELETE /venda");
  } catch (err) {
    next(err);
  }
}

async function updateVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.vendaId) {
      throw new Error("Venda ID é obrigatório!");
    }
    if (!venda.valor) {
      throw new Error("Valor é obrigatório!");
    }
    if (!venda.data) {
      throw new Error("Data é obrigatório!");
    }
    if (!venda.clienteId) {
      throw new Error("Cliente ID é obrigatória!");
    }
    if (!venda.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    res.send(await VendaService.updateVenda(venda));
    logger.info(`PUT /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createVenda,
  getVendas,
  getVenda,
  deleteVenda,
  updateVenda,
};
