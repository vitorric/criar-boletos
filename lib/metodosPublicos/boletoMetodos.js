const fs = require('fs');
const Boleto = require('../utils/functions/boletoUtils');
const BoletoStringify = require('../stringify/boletoStringify');

module.exports = class Boletos {
  constructor({ banco, pagador, boleto, beneficiario, instrucoes, localPagamento }) {
    this.banco = banco;
    this.pagador = pagador;
    this.boleto = boleto;
    this.beneficiario = beneficiario;
    this.instrucoes = instrucoes;
    this.boletoInfo;
    this.localPagamento = localPagamento;
  }

  gerarBoleto() {
    const dataInstance = Boleto.Datas;
    const { datas, valor, especieDocumento, numeroDocumento, codigoDeBarras, linhaDigitavel, aceite } = this.boleto;
    
    this.boletoInfo = Boleto.Boleto.novoBoleto()
      .comDatas(dataInstance.novasDatas()
        .comVencimento(datas.vencimento)
        .comProcessamento(datas.processamento)
        .comDocumento(datas.documentos))
      .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario))
      .comPagador(BoletoStringify.createPagador(this.pagador))
      .comBanco(this.banco)
      .comValorBoleto(parseFloat(valor).toFixed(2))
      .comNumeroDoDocumento(numeroDocumento)
      .comEspecieDocumento(especieDocumento)
      .comCodigoDeBarras(codigoDeBarras)
      .comLinhaDigitavel(linhaDigitavel)
      .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes))
			.comAceite(aceite)
      .comLocaisDePagamento([this.localPagamento]);
  }

  pdfFile(dir = './tmp/boletos', filename='boleto') {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const stream = fs.createWriteStream(`${dir}/${filename}.pdf`);

    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => {
      stream.on('finish', () => {
        resolve({ boleto: this.boleto, stream });
      });
    }));
  }

  pdfStream(stream) {
    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }
};
