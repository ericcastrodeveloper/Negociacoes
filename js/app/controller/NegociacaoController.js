class NegociacaoController {

    

    constructor() {
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
        this._listNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listNegociacoes)

    }

    adiciona(event) { 
        event.preventDefault()

        this._listNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listNegociacoes)
        this._limpaFormulario();
        console.log("negociacoes =>", this._listNegociacoes.negociacoes)

    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario(){
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 1.00
        this._inputData.focus();

    }
}