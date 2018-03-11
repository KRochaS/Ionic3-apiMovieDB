import { ApiFilmesProvider } from './../../providers/api-filmes/api-filmes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalhesTvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'detalhe_tv',
  segment: 'detalhes_tv/:id'
})
@Component({
  selector: 'page-detalhes-tv',
  templateUrl: 'detalhes-tv.html',
})
export class DetalhesTvPage {

  tv: any = {

  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiFilme: ApiFilmesProvider) {




      let id = navParams.get('id');

      let thisObj = this;


      apiFilme.buscaTV(id).then(function(tv) {
        thisObj.tv = tv;

      })
  }

  ionViewDidLoad() {
  
  }

}
