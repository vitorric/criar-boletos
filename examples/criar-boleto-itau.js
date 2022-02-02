const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
  banco: new Bancos.Citi(),
  pagador: {
    nome: 'VITOR RICARDO',
    endereco: {
      logradouro: 'R. TANTO FAZ, 15',
      bairro: 'BAIRRO NAO SEI',
      cidade: 'SOROCABA',
      estadoUF: 'SP',
      cep: '18530-000'
    }
  },
  instrucoes: [''],
  localPagamento: 'PAGAVEL EM QUALQUER BANCO, OU CORRESPONDENTE NÃO BANCÁRIO, MESMO APÓS O VENCIMENTO',
  beneficiario: {
    nome: 'NOME EMPRESA',
    cnpj: '18795541000119',
    logo: '',
    dadosBancarios: {
      carteira: '109',
      agencia: '0000',
      agenciaDigito: '0',
      conta: '00000',
      contaDigito: '0',
      nossoNumero: '00000000',
      nossoNumeroDigito: '0'
    },
    endereco: {
      logradouro: 'RUA',
      bairro: 'BAIRRO',
      cidade: 'SOROCABA',
      estadoUF: 'SP',
      cep: '18030-005'
    }
  },
  boleto: {
    numeroDocumento: '',
    especieDocumento: 'DS',
    valor: 1.00,
    datas: {
      vencimento: '2021-11-08',
      processamento: '2021-11-08',
      documentos: '2021-11-08'
    },
    aceite: false,
    codigoDeBarras: '00000000000000000000000000000000000000000000',
    linhaDigitavel: '00000.00000 00000.000000 00000.000000 0 00000000000000'
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {
  // ctx.res.set('Content-type', 'application/pdf');	
  await streamToPromise(stream);
}).catch((error) => {
  return error;
});

