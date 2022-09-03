const conexao = require("../config/database");

const AnimeSchema = conexao.Schema({
  foto: {
    type: "String",
  },
  nome: {
    type: "String",
  },
  episodio: {
    type: "Number",
  },
  inicio: {
    type: "Date",
  },
  fim: {
    type: "Date",
  },
  diretor: {
    type: conexao.Schema.Types.ObjectId,
    ref: "Diretor",
  },
  personagens: [{
    type: conexao.Schema.Types.ObjectId,
    ref: "Personagem",
  }],
  estudio: {
    type: "String",
  },
  genero: {
    type: "String",
  },
});

module.exports = conexao.model("Anime", AnimeSchema);
