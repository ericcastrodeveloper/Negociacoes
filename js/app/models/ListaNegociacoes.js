class ListaNegociacoes{

    constructor(){
        this._negociacoes = []
    }

    adiciona(negociacoes){
        this._negociacoes.push(negociacoes)
    }

    esvazia(){
        this._negociacoes = []
    }

    get negociacoes(){
        //return this_negociacoes

        return [].concat(this._negociacoes)
    }
}