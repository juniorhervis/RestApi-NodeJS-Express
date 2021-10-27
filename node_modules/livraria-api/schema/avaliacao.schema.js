import mongoose from "mongoose";

const AvaliacaoSchema = new mongoose.Schema(
  {
    nome: String,
    nota: Number,
    avaliacao: String,
  },
  { collection: "LivroInfo" }
);

export default AvaliacaoSchema;
