import { dateDDMMAAAA } from "../utils/formater";

export class FilmesTvAdapter {
    tvfilme = [];

     imgLink = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"


    constructor(resultadosFilmeTV: any) {

        if (resultadosFilmeTV == null) {
            throw new Error('Não encontrou resultados');
        } else {
            // Lista de filmes a serem retornados. Os dados dessa lista são os filmes da API após passarem
            // por uma adaptação
    
    
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
                    imagem: !imgsrc ? null : this.imgLink + imgsrc,
                    data: data
    
                };
                this.tvfilme.push(filme);
    
            }

        }

    }
    
}