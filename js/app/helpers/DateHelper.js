class DateHelper{
    constructor(){
        throw new Error("Esta classe não pode ser instanciada")
    }

    static textoParaData(texto){

        //regex d -> digito //
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error("Deve estar no formato aaaa-mm-dd!")
        }
        // ... => spread operator
        return new Date(
            ...texto.split('-')
            .map(
              (item, index) => item - index % 2
            )
        )
    }

    static dataParaTexto(data){
        //template strings ``
        return `${data.getDate()}/${data.getMonth()}/${data.getYear()}`
    }
}