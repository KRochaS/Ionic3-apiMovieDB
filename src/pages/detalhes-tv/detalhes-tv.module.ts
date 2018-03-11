import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesTvPage } from './detalhes-tv';

@NgModule({
  declarations: [
    DetalhesTvPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesTvPage),
  ],
})
export class DetalhesTvPageModule {}
