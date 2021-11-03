import { useEffect, useState } from "react";
import initializeAuthentication from "../../Firebase/Firebase.init";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
initializeAuthentication();
const useFirebase = () => {
  const [user, setuser] = useState({});
  const [error, seterror] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  //sign in with google
  const SignInUsingGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setuser(user);
        seterror("");
        // ...
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  const SignInUsingGit = () => {
    signInWithPopup(auth, gitProvider)
      .then((result) => {
        const user = result.user;
        setuser(user);
        seterror("");
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  // sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setuser("");
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("instance the state change", user);
        setuser(user);
      }
    });
  }, []);
  return { user, error, SignInUsingGoogle, SignInUsingGit, handleSignOut };
};

export default useFirebase;
