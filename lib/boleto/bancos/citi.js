const path = require('path');
const StringUtils = require('../../utils/string-utils');
const pad = StringUtils.pad;
const insert = StringUtils.insert;


const GeradorDeDigitoPadrao = require('../gerador-de-digito-padrao');
const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');


//Varias coisas implementadas inclusive arquivos de retorno
//https://github.com/kivanio/brcobranca
//https://github.com/pagarme/node-boleto

//Várias validações
//http://ghiorzi.org/DVnew.htm

var Citi = (function() {
	var NUMERO_CITI = '745',
		DIGITO_CITI = '5';

	function Citi() {

	}

	Citi.prototype.getTitulos = function() {
		return {};
	};

	Citi.prototype.exibirReciboDoPagadorCompleto = function() {
		return false;
	};

	Citi.prototype.exibirCampoCip = function() {
		return false;
	};

	Citi.prototype.geraCodigoDeBarrasPara = function(boleto) {
		return '';
	};

	Citi.prototype.getNumeroFormatadoComDigito = function() {
		return [NUMERO_CITI, DIGITO_CITI].join('-');
	};

	Citi.prototype.getCarteiraFormatado = function(beneficiario) {
		return pad(beneficiario.getCarteira(), 3, '0');
	};

	Citi.prototype.getCarteiraTexto = function(beneficiario) {
		return this.getCarteiraFormatado(beneficiario);
	};

	Citi.prototype.getCodigoFormatado = function(beneficiario) {
		return pad(beneficiario.getCodigoBeneficiario(), 5, '0');
	};

	Citi.prototype.getImagem = function() {
		return path.join(__dirname, 'logotipos/citi.png');
	};

	Citi.prototype.getNossoNumeroFormatado = function(beneficiario) {
		return pad(beneficiario.getNossoNumero(), 8, '0');
	};

	Citi.prototype.getNossoNumeroECodigoDocumento = function(boleto) {
		var beneficiario = boleto.getBeneficiario();

		return [
			beneficiario.getCarteira(),
			this.getNossoNumeroFormatado(beneficiario),
		].join('/') + '-' + beneficiario.getDigitoNossoNumero();
	};

	Citi.prototype.getNumeroFormatado = function() {
		return NUMERO_CITI;
	};

	Citi.prototype.getNome = function() {
		return '';
	};

	Citi.prototype.getImprimirNome = function() {
		return true;
	};

	Citi.prototype.getAgenciaECodigoBeneficiario = function(boleto) {
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	Citi.novoCiti = function() {
		return new Citi();
	};

	return Citi;
})();

module.exports = Citi;
