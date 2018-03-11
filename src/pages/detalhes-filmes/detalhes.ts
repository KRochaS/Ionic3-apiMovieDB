import { ApiFilmesProvider } from './../../providers/api-filmes/api-filmes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'detalhes_filme',
  segment: 'detalhes_filme/:id'
})
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesFilmePage {

  filme: any = {
    
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiFilme: ApiFilmesProvider) {

      // obtem parametro id do filme 
      // que é recebido de outra tela 
      let id = navParams.get('id');


      let thisObj = this;
    
      // buscando filme por id, usando api
      apiFilme.buscaFilme(id).then(function(filme) {
        thisObj.filme = filme;
        console.log('FILME', filme);
      })
  }

  ionViewDidLoad() {

  }



}
