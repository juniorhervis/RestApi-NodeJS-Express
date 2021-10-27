import express from "express";
import livroController from "../controllers/livro.controller.js";
import LivroController from "../controllers/livro.controller.js";

const router = express.Router();

router.post("/", LivroController.createLivro);
router.get("/", LivroController.getLivros);
router.get("/info", LivroController.getLivrosInfo);
router.get("/:id", LivroController.getLivro);
router.delete("/:id", LivroController.deleteLivro);
router.put("/", LivroController.updateLivro);
router.post("/info", LivroController.createLivroInfo);
router.put("/info", LivroController.updateLivroInfo);
router.post("/avaliacao", LivroController.createAvaliacoes);
router.delete("/:id/avaliacao/:index", LivroController.deleteAvaliacoes);
router.delete("/info/:id", LivroController.deleteLivroInfo)

export default router;
