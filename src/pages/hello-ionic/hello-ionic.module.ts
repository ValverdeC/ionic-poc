import { HelloIonicPage } from './hello-ionic';
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [ HelloIonicPage ],
  imports: [ IonicPageModule.forChild(HelloIonicPage)]
})
export class HelloIonicModule {}
