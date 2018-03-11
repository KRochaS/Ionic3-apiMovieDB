import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dateDDMMAAAA, perc } from '../../utils/formater';
import { formataFilmeTV, formataListaGeneros } from '../../adapters/adapters';




@Injectable()
export class ApiFilmesProvider {
	
	private apiLink = "https://api.themoviedb.org/3/";
	
	private imgLink = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"
	
	private apikey = "5e16d09ddb84044ffd8a8649ffbb611c";		
		
	constructor(public http: HttpClient) {
		//console.log('Hello ApiFilmesProvider Provider');
	}
		
	buscaFilme(id: any) {
		let thisObj = this;

		return this.httpGet(thisObj.apiLink + `movie/` + id, {api_key:thisObj.apikey, language: 'pt-BR' }).then(function(resultadoFilme) {
			if(resultadoFilme == null) {
				throw new Error('Não encontrou filme');
			} else {

				let filme = {
					
					nome: resultadoFilme.title,
					desc: resultadoFilme.overview,
					imagem: thisObj.imgLink + (resultadoFilme.backdrop_path).replace('/', ''),
					popularidade: perc(resultadoFilme.popularity)

				}

				return filme;
			}
		})

	  
	}

	/** 
	 * Busca primeira página de filmes mais populares atráves da API 
	 * do the movie DB
	 *  @param pagina número da página da lista de filmes
	*/
	listaFilmes(pagina?: number) {

		if (!pagina) {
			pagina = 1;
		}
		
		let thisObj = this;

		return this.httpGet(thisObj.apiLink + `movie/popular`, {page: pagina, api_key: thisObj.apikey, language: 'pt-BR'})
	}

	

	searchFilme(query: string, pagina?: number) {

		if (!pagina) {
			pagina = 1;
		}
		
		let thisObj = this;

		return this.httpGet(thisObj.apiLink + `search/movie`, {api_key: thisObj.apikey, language: 'pt-BR', query: query})

	}

	searchTV(query: string, pagina?: number) {

		if(!pagina) {
			pagina = 1
		}

		let thisObj = this;

		return this.httpGet(thisObj.apiLink + `search/tv`, {api_key: thisObj.apikey, language: 'pt-BR', query: query})
	}

	
	listaTv() {
		
		let thisObj = this;
		
		return this.httpGet(thisObj.apiLink + 'tv/popular', {page: 1, api_key: thisObj.apikey, language: 'pt-BR'})
	}

	buscaTV(id: any) {
		let thisObj = this;

		let url = `${thisObj.apiLink}tv/${id}`;

		return this.httpGet(url, {api_key: thisObj.apikey, language: 'pt-BR'}).then(function(resultadoTV) {
			if(resultadoTV == null) {
				throw new Error('Não encontrou filme');
			} else {
				
				let tv = {
					nome: resultadoTV.name,
					desc: resultadoTV.overview,
				    imagem: thisObj.imgLink + (resultadoTV.backdrop_path).replace('/',''),
					popularidade: perc(resultadoTV.popularity)
				}

				return tv;
			}
		})

	}


	listGeneros() {
		let thisObj = this;

		return this.httpGet(thisObj.apiLink + 'genre/movie/list', {api_key: thisObj.apikey, language: 'pt-BR'}).then((function(generos) {
			return formataListaGeneros(generos);
		}))
	}
	
	
	/**
	 * Executa uma requisição HTTP usando o método GET;
   * @param url url da requisição.
   * @param args parâmetros opcionais de requisição. 
   *     Ex.: Se url for https://www.google.com.br/search e args for { q: 'teste' },
   *     este método fará uma requisição com a URL https://www.google.com.br/search?q="teste"
   */
  	httpGet (url: string, args?: any): Promise<any> {
		let thisObj = this;
		if (!url) throw new Error('URL não definida.');
		let urlComParametros = url;    

		// verifica se recebeu argumentos
		let noArgs = !args || (Object.keys(args).length === 0 && args.constructor === Object);
		// se recebeu argumentos, os transforma estes argumentos em parâmetros de uma url    
		var argsStr = '';        
		if(!noArgs) {
			argsStr = "?" + 
			Object.keys(args).map(function(prop) {
				if(args[prop] == '') {
					args[prop] = '""';
				}
				return [prop, args[prop]].map(encodeURIComponent).join("=");
			}).join("&");
		}
        url +=  argsStr;
		// executa uma requisição usando o médoto GET
		return new Promise(function (resolve, reject) {
			let headers = new HttpHeaders({ 'Content-Type': 'application/json'  });                              
			// let options = new RequestOptions ({ headers: headers});  
			thisObj.http.get(url).subscribe(function (resultado: any){
				resolve(resultado);
			},
			function (error: Error) {
				reject(error);
			});
		});

  }


 
}
