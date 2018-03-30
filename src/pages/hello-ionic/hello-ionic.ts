import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  itemsCollection: AngularFirestoreCollection<any>; //Firestore collection
  items: Observable<any[]>;
  fruit: string = '';

  constructor(afDB: AngularFirestore, private alertCtrl: AlertController) {
    this.itemsCollection = afDB.collection('fruits'); //ref()
    this.items = this.itemsCollection.valueChanges();
  }

  public addFruit() {
    this.itemsCollection.add({
      name: this.fruit
    })
    .then( (result) => {
      let alert = this.alertCtrl.create({
        title: "Document addded with id >>> " + result.id,
        buttons: ['Dismiss']
      });
      alert.present();
    })
    .catch( (error) => {
      let alert = this.alertCtrl.create({
        title: error
      });
      alert.present();
    });
  }
}
