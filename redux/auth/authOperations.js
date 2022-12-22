import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, signOutUser, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    console.log(name, email, password);
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: name,
      });

      const { uid, displayName } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
        })
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
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
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
