import LivroService from "../services/livro.service.js";
async function createLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!livro.valor) {
      throw new Error("Valor é obrigatório!");
    }
    if (!livro.estoque) {
      throw new Error("Estoque é obrigatório!");
    }
    if (!livro.autorId) {
      throw new Error("Autor ID é obrigatório!");
    }
    res.send(await LivroService.createLivro(livro));
    res.send({});
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros());
    logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id));
    logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function deleteLivro(req, res, next) {
  try {
    await LivroService.deleteLivro(req.params.id);
    res.end();
    logger.info("DELETE /livro");
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    if (!livro.nome) {
      throw new Error("Nome é obrigatório!");
    }
    if (!livro.valor) {
      throw new Error("Valor é obrigatório!");
    }
    if (!livro.estoque) {
      throw new Error("Estoque é obrigatório!");
    }
    if (!livro.autorId) {
      throw new Error("Autor ID é obrigatório!");
    }
    res.send(await LivroService.updateLivro(livro));
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    await LivroService.createLivroInfo(livroInfo);
    res.end();
  } catch (err) {
    next(err);
    logger.info(`POST /livro/info - ${JSON.stringify(livro)}`);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    await LivroService.updateLivroInfo(livroInfo);
    res.end();
  } catch (err) {
    next(err);
    logger.info(`PUT /livro/info - ${JSON.stringify(livro)}`);
  }
}

async function createAvaliacoes(req, res, next) {

  try {
    let params = req.body;
    console.log(params)
    if (!params.livroId) {
      throw new Error("Livro ID é obrigatório!");
    }
    if (!params.avaliacao) {
      throw new Error("Avaliação é obrigatória!");
    }
    await LivroService.createAvaliacoes(params.avaliacao, params.livroId)
    logger.info("POST /livro/avaliacao/");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function deleteAvaliacoes(req, res, next) {
  try {
    await LivroService.deleteAvaliacoes(req.params.id, req.params.index);
    logger.info(`DELETE /livro/${req.params.id}/avaliacao/${req.params.index}`);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function getLivrosInfo(req, res, next) {
  try {
    res.send(await LivroService.getLivrosInfo());
    logger.info("GET /livro/info");
  } catch (err) {
    next(err);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    res.send(await LivroService.deleteLivroInfo(parseInt(req.params.id)));
    logger.info("DELETE /livro/info");
  } catch (err) {
    next(err);
  }
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
