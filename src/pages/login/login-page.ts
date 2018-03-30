import { FCM } from '@ionic-native/fcm';
import { HelloIonicPage } from './../hello-ionic/hello-ionic';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../shared/model/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})

export class LoginPage {
  private userCollection: AngularFirestoreCollection<any>;
  public user = {} as User;
  public isRegister = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcm: FCM
  ) {
    this.userCollection = afDB.collection('users');
  }

  async onLoginOrRegister(user: User) {
    // New User
    if (this.isRegister) {
      this.register(user);
    } else { // Existing User
      this.login(user);
    }
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HelloIonicPage);
        this.fcm.onTokenRefresh().subscribe((token) => {
          user.deviceToken = token;
          this.userCollection.add(user);
        })
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        user.uid = result.uid;
        this.fcm.getToken().then((token) => {
          user.deviceToken = token;
          this.userCollection.add(user);
          this.navCtrl.setRoot(HelloIonicPage);
        });

        this.fcm.onTokenRefresh().subscribe((token) => {
          user.deviceToken = token;
          this.userCollection.add(user);
        })
      }
    } catch (e) {
      console.error(e);
    }
  }

  public onNewUserClick() {
    this.isRegister = true;
  }
}
