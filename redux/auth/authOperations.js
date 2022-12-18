import db from "../../firebase/config";

export const authSignUpUser =
  ({ name, email, password }) =>
  async (dispatch, getState) => {
    console.log(name, email, password);
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
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

export const authSignOutUser = () => async (dispatch, getState) => {};
