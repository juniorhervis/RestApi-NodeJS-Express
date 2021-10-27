import ClienteService from "../services/cliente.service.js";
async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (!cliente.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!cliente.email) {
      throw new Error("Email é obrigatório!");
    }
    if (!cliente.senha) {
      throw new Error("Senha é obrigatória!");
    }
    if (!cliente.telefone) {
      throw new Error("Telefone é obrigatório!");
    }
    if (!cliente.endereco) {
      throw new Error("Endereço é obrigatório!");
    }
    res.send(await ClienteService.createCliente(cliente));
    res.send({});
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.id));
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    await ClienteService.deleteCliente(req.params.id);
    res.end();
    logger.info("DELETE /cliente");
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (!cliente.clienteId) {
      throw new Error("Cliente ID é obrigatório!");
    }
    if (!cliente.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!cliente.email) {
      throw new Error("Email é obrigatório!");
    }
    if (!cliente.senha) {
      throw new Error("Senha é obrigatória!");
    }
    if (!cliente.telefone) {
      throw new Error("Telefone é obrigatório!");
    }
    if (!cliente.endereco) {
      throw new Error("Endereço é obrigatório!");
    }
    res.send(await ClienteService.updateCliente(cliente));
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
