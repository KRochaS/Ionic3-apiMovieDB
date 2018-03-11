import { dateDDMMAAAA } from "../utils/formater";


export function formataFilmeTV(resultadosFilmeTV, imgLink) {


    let thisObj = this;
    if (resultadosFilmeTV == null) {
        throw new Error('Não encontrou resultados');
    } else {
        // Lista de filmes a serem retornados. Os dados dessa lista são os filmes da API após passarem
        // por uma adaptação
        let filmes = [];


        // Para cada filme recebido da Api executa uma transformação nos dados 
        // e diciona na lista de retorno 
        for (let i = 0; i < resultadosFilmeTV.results.length; i++) {

            let resultado = resultadosFilmeTV.results[i];

            let imgsrc = resultado.poster_path ? resultado.poster_path : resultadosFilmeTV.backdrop_path;


            try {

                imgsrc = imgsrc.replace('/', '');

            } catch (error) {


            }

            let data = dateDDMMAAAA(resultado.release_date) ? dateDDMMAAAA(resultado.release_date) : dateDDMMAAAA(resultado.first_air_date)

            // Adiciona um filme a lista de filmes, fazendo a tranformações nos dados
            let filme = {


                id: resultado.id,
                nome: resultado.title ? resultado.title : resultado.name,
                imagem: !imgsrc ? null : imgLink + imgsrc,
                data: data

            };
            filmes.push(filme);

        }

        return filmes;
    }

}

export function formataListaGeneros(generos) {
        let corGenero = {
            28: 'amarelo',
            12: 'azul',
            16: 'verde',
            35: 'laranja',
            80: 'marrom',
            99: 'rosa',
            18: 'cinza',
            10751: 'vermelho',
            14: 'deep purple',
            36: 'indigo',
            27: 'teal',
            10402:'bordo',
            9648: 'castanho',
            10749: 'madeira',
            878: 'ciano',
            10770: 'lilas',
            53: 'bege',
            10752: 'azul marinho',
            37: 'vermelho vinho'



        }

            if (generos == null) {
                throw new Error('Não encontrou nenhuma lista de Gêneros');
            } else {
               
                let _generos = [];
    
                for (let i = 0; i < generos.genres.length; i++) {
        

                    let genero = generos.genres[i];

                    genero.cor = corGenero[genero.id];

                   _generos.push(genero)
        
                }
        
                return _generos;
    
            }
        
        }


