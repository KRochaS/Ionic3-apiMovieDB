import { FilmesTvAdapter } from './../../adapters/filmes-tv-adapters';
import { ApiFilmesProvider } from './../../providers/api-filmes/api-filmes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TelevisaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: 'tv',
	segment: 'tv'
})
@Component({
	selector: 'page-televisao',
	templateUrl: 'televisao.html',
})
export class TelevisaoPage {
	
	query: string = '';

	programaTV: FilmesTvAdapter;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public apiFilme: ApiFilmesProvider) {


		let thisObj = this;


		apiFilme.listaTv().then(function (programaTV: any[]) {
			thisObj.programaTV = new FilmesTvAdapter(programaTV);
		}).catch(function (error: Error) {
			console.log(error);
		});

	}

	abrirDetalhesTV(tv) {
		this.navCtrl.push('detalhe_tv', {id: tv.id})
	}

	ionViewDidLoad() {

	}

	onInput(event: Event) {
		let thisObj = this;

		if (this.query) {
			this.apiFilme.searchTV(this.query).then(function(tv: any[]){
				thisObj.programaTV = new FilmesTvAdapter(tv);
			}). catch(function(error: Error) {
				console.log(error);
			})
		} else {
			this.apiFilme.listaTv().then(function (programaTV: any[]) {
				thisObj.programaTV = new FilmesTvAdapter(programaTV);
			}).catch(function (error: Error) {
				console.log(error);
			});

		}
	}

}
