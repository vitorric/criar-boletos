const Boleto = require('../utils/functions/boletoUtils');

module.exports = class BoletoStringify {
    static enderecoPagador({ logradouro, bairro, cidade, estadoUF, cep }) {
      return Boleto.Endereco.novoEndereco()
        .comLogradouro(logradouro)
        .comBairro(bairro)
        .comCidade(cidade)
        .comUf(estadoUF)
        .comCep(cep);
    }
  
    static createPagador({ endereco, nome, registroNacional }) {
      const enderecoPagador = this.enderecoPagador(endereco);
      return Boleto.Pagador.novoPagador()
        .comNome(nome)
        .comRegistroNacional(registroNacional)
        .comEndereco(enderecoPagador);
    }
  
    static createBeneficiario({ dadosBancarios, endereco, cnpj, nome, logo }) {
      const enderecoBeneficiario = endereco ? this.enderecoPagador(endereco) : null;
  
      let novoBeneficiario = Boleto.Beneficiario.novoBeneficiario()
        .comNome(nome)
        .comLogo(logo)
        .comRegistroNacional(cnpj)
        .comCarteira(dadosBancarios.carteira)
        .comAgencia(dadosBancarios.agencia)
        .comDigitoAgencia(dadosBancarios.agenciaDigito)
        .comCodigoBeneficiario(dadosBancarios.conta)
        .comDigitoCodigoBeneficiario(dadosBancarios.contaDigito)
        .comNossoNumero(dadosBancarios.nossoNumero) //11 -digitos // "00000005752"
        .comDigitoNossoNumero(dadosBancarios.nossoNumeroDigito) // 1 digito // 8
        .comEndereco(enderecoBeneficiario);
  
      if (dadosBancarios.convenio) {
        novoBeneficiario.comNumeroConvenio(dadosBancarios.convenio);
      }
  
      return novoBeneficiario;
    }
  
    static createInstrucoes(instrucoes) {
      if (!Array.isArray(instrucoes)) {
        return [instrucoes];
      }
      return instrucoes;
    }
  };