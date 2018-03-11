
import { ApiFilmesProvider } from './../../providers/api-filmes/api-filmes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilmesTvAdapter } from '../../adapters/filmes-tv-adapters';


@IonicPage({
	name: 'filmes',
	segment: 'filmes'
})
@Component({
	selector: 'page-filmes',
	templateUrl: 'filmes.html',
})
export class FilmesPage {

	query: string = '';

	filmes: FilmesTvAdapter;



	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public apiFilme: ApiFilmesProvider) {


		let thisObj = this;
		// apiFilme.getFilmes().then(function(filmes: any[]) {      
		// thisobj.filmes = filmes;
		//);


		apiFilme.listaFilmes(1).then(function (filmes: any[]) {
			thisObj.filmes = new FilmesTvAdapter(filmes);
			// thisobj.filmes = filmes;
		}).catch(function (error: Error) {
			console.log(error);
		});


	}

	defineFilmes(filmes) {

		this.filmes = new FilmesTvAdapter(filmes);

	}

	ionViewDidLoad() {

	}

	abrirDetalhes(filme) {
		this.navCtrl.push('detalhes_filme', { id: filme.id });
	}

	onInput(event: Event) {

		let thisObj = this;


		if (this.query) {
			this.apiFilme.searchFilme(this.query).then(function (filmes: any[]) {
				 thisObj.filmes = new FilmesTvAdapter(filmes);
			}).catch(function (error: Error) {
				console.log(error);
			})

		} else {
			this.apiFilme.listaFilmes().then(function (filmes: any[]) {
				//  thisObj.filmes = filmes;
			}).catch(function (error: Error) {
				console.log(error);
			});
		}
	}
}
