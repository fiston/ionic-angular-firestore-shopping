import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.createTeamMember = functions.firestore
  .document(`teamProfile/{teamId}/teamMemberList/{newUserId}`)
  .onCreate(async (snapshot, context) => {
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const id: string = snapshot.data()!.id;
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const email: string = snapshot.data()!.email;
    // tslint:disable-next-line: no-unnecessary-type-assertion
    const teamId: string = snapshot.data()!.teamId;

    const newUser: admin.auth.UserRecord = await admin.auth().createUser({
      uid: id,
      email: email,
      password: '123456789'
    });

    await admin
      .firestore()
      .doc(`userProfile/${id}`)
      .set({
        email: email,
        id: id,
        teamId: teamId,
        teamAdmin: false
      });

    return newUser;
  });
