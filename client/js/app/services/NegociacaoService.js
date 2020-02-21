class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana4(){
        return new Promise((resolve, reject) => {
            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
                .then(periodos => {
                    let negociacoes = periodos
                        .reduce((dados, periodo) => dados.concat(periodo), [])
                        .map(
                            dado =>
                                new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)
                        );

                    resolve(negociacoes);
                })
                .catch(erro => reject(erro));
        });
    
    }

    obterNegociacoesSemana3(){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest()

            xhr.open('GET', 'http://localhost:3000/negociacoes/semana');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        )
    
                    } else {
                        reject("deu erro")
                    }
                }
            }
            xhr.send();

        })
    }

    //cb -> callback
    obterNegociacoesSemana2(cb) {
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    )

                } else {
                    cb("deu erro", null)
                }
            }
        }
        xhr.send();
    }

    obterNegociacoesAnterior2(cb){
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'http://localhost:3000/negociacoes/anterior');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    )

                } else {
                    cb("deu erro", null)
                }
            }
        }
        xhr.send();
    }

    obterNegociacoesRetrasada2(cb){
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'http://localhost:3000/negociacoes/retrasada');
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    )

                } else {
                    cb("deu erro", null)
                }
            }
        }
        xhr.send();
    }

    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/semana")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana");
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/anterior")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana anterior");
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/retrasada")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana retrasada");
                });
        });
    }

    obterNegociacoes() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
                .then(periodos => {
                    let negociacoes = periodos
                        .reduce((dados, periodo) => dados.concat(periodo), [])
                        .map(
                            dado =>
                                new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)
                        );

                    resolve(negociacoes);
                })
                .catch(erro => reject(erro));
        });
    }

    obterNegociacoes(){
        return new Promisse((resolve, reject) => {

            Promise.all([
                service.obterNegociacoesDaSemana(),
                service.obterNegociacoesDaSemanaAnterior(),
                service.obterNegociacoesDaSemanaRetrasada(),
            ])
            .then(negociacoes => {
    
                //arrayFlat - todas as listas
                //primeiro parametro a concatenação das listas, segundo lista vazia
                negociacoes.reduce((arrayFlat, array) => arrayFlat.concat(array), [])
                .map(
                    objeto =>
                        new Negociacao(
                            new Date(objeto.data),
                            objeto.quantidade,
                            objeto.valor
                        )).resolve(negociacoes)
            
            })
            .catch(
                erro => {
                    this._mensagem.texto = erro;
                    this._mensagemView.update(this._mensagem);
                }
            )
        })

        
    }
}
