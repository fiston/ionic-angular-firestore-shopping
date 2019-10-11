import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

import { UserProfile } from '../models/user-profile';
import { TeamProfile } from '../models/team-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    console.log(this.getTeamId());
  }

  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  async createAdminUser(
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const adminUserCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userProfileDocument: AngularFirestoreDocument<
        UserProfile
      > = this.firestore.doc(`userProfile/${adminUserCredential.user.uid}`);

      const teamId: string = this.firestore.createId();

      await userProfileDocument.set({
        id: adminUserCredential.user.uid,
        email,
        teamId,
        teamAdmin: true
      });

      const teamProfile: AngularFirestoreDocument<
        TeamProfile
      > = this.firestore.doc(`teamProfile/${teamId}`);

      await teamProfile.set({
        id: teamId,
        teamAdmin: adminUserCredential.user.uid,
        groceryList: null
      });

      return adminUserCredential.user;
    } catch (error) {
      console.error(error);
    }
  }

  async createRegularUser(email: string): Promise<any> {
    const teamId: string = await this.getTeamId();

    const userCollection: AngularFirestoreCollection<
      any
    > = this.firestore.collection(`teamProfile/${teamId}/teamMemberList`);
    const id: string = this.firestore.createId();

    const regularUser = { id, email, teamId };

    return userCollection.add(regularUser);
  }

  async getTeamId(): Promise<string> {
    const user: firebase.User = await this.getUser();
    const userProfile: firebase.firestore.DocumentSnapshot = await this.firestore
      .doc(`userProfile/${user.uid}`)
      .get()
      .toPromise();

    return userProfile.data().teamId;
  }
}
