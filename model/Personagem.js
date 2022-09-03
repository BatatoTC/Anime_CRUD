const conexao = require("../config/database");

const PersonagemSchema = conexao.Schema({
  nome: {
    type: "String",
  },
  foto: {
    type: "String",
  },
  animes: [{
    type: conexao.Schema.Types.ObjectId,
    ref: "Anime",
  }],
});

module.exports = conexao.model("Personagem", PersonagemSchema);
