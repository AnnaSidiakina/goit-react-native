import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, signOutUser, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ name, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: name,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
          avatar: photoURL,
        })
      );
      console.log("user", user);
    } catch (error) {
      alert("Something went wrong. Please, try again");
      console.log("error.message", error.message);
    }
  };

export const authChangeUserAvatar =
  ({ name, email, avatar }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().currentUser;

      await user.updateProfile({
        photoURL: avatar,
        displayName: name,
      });
      const { uid, displayName, photoURL } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log(email, password);
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      alert("Wrong name or password. Please, try again");
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(signOutUser());
};
export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
