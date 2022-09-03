const conexao = require("../config/database");

const DiretorSchema = conexao.Schema({
  nome: {
    type: "String",
  },
  foto: {
    type: "String",
  },
  nascimento: {
    type: "Date",
  },
});

module.exports = conexao.model("Diretor", DiretorSchema);
