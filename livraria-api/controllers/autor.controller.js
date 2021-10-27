import AutorService from "../services/autor.service.js";
async function createAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!autor.email) {
      throw new Error("Email é obrigatório!");
    }
    if (!autor.telefone) {
      throw new Error("Telefone é obrigatório!");
    }
    res.send(await AutorService.createAutor(autor));
    logger.info(`POST /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function getAutores(req, res, next) {
  try {
    res.send(await AutorService.getAutores());
    logger.info("GET /autor");
  } catch (err) {
    next(err);
  }
}

async function getAutor(req, res, next) {
  try {
    res.send(await AutorService.getAutor(req.params.id));
    logger.info("GET /autor");
  } catch (err) {
    next(err);
  }
}

async function deleteAutor(req, res, next) {
  try {
    await AutorService.deleteAutor(req.params.id);
    res.end();
    logger.info("DELETE /autor");
  } catch (err) {
    next(err);
  }
}

async function updateAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.autorId) {
      throw new Error("Autor ID é obrigatório!");
    }
    if (!autor.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!autor.email) {
      throw new Error("Email é obrigatório!");
    }
    if (!autor.telefone) {
      throw new Error("Telefone é obrigatório!");
    }
    res.send(await AutorService.updateAutor(autor));
    logger.info(`PUT /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAutor,
  getAutores,
  getAutor,
  deleteAutor,
  updateAutor,
};
