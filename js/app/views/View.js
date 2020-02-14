class View {

    constructor(elemento){
        this._elemento = elemento
    }

    update(model){
        this._elemento.innerHTML = this.template(model)
    }

    template(){
        throw new Error("Esse método deve ser implementado!")
    }
}