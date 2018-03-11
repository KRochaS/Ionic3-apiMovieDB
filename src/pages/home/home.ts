import { ApiFilmesProvider } from './../../providers/api-filmes/api-filmes';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage({
	name: 'intro',
	segment: 'intro'
})

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {


	generos: any[] = [];

	constructor(
		public navCtrl: NavController,
		public apiFilme: ApiFilmesProvider) {

		let thisObj = this;


		apiFilme.listGeneros().then(function(generos: any[]) {
			thisObj.generos = generos;
			console.log('home.ts generos: ', thisObj.generos);
		}).catch(function(error: Error) {
			console.log(error);
		})

	}

}
