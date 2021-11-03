// module 56,57,57.5
import "./App.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import initializeAuthentication from "./Firebase/Firebase.init";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
initializeAuthentication();
function App() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [toggle, settoggle] = useState(false);
  const [error, seterror] = useState("");
  const [display, setdisplay] = useState({});
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleSubmit = (e) => {
    e.preventDefault();
    toggle ? logInSignIn(email, password) : newRegisterUser(email, password);
    updateProfileInfo();
  };
  // create new user -----register
  const newRegisterUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        seterror("");
        verifyEmail();
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  // verify email
  const verifyEmail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("send email");
    });
  };
  //reset password
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  // user login
  const logInSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setdisplay(user);
        seterror("");
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  // sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setdisplay("");
        seterror("");
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  //// update profile value show login time
  const updateProfileInfo = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {
        seterror(error.message);
      });
  };
  const handleNameChange = (e) => {
    setname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const handleChecked = (e) => {
    settoggle(e.target.checked);
  };
  // sign up with google
  const googleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setdisplay(user);
        seterror("");
        // ...
      })
      .catch((error) => {
        seterror(error.message);
      });
  };
  return (
    <div className="container my-4">
      {/* from register */}
      <Form onSubmit={handleSubmit}>
        <h3>Please {toggle ? "Login" : "Sign up"} </h3>
        {!toggle && (
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onBlur={handleNameChange}
                type="text"
                placeholder="your name"
              />
            </Col>
          </Form.Group>
        )}

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onBlur={handleEmailChange}
              type="email"
              placeholder="Email"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onBlur={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check
              onClick={handleChecked}
              label="Are you already registered? Login"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">{toggle ? "Login" : "Sign up"} </Button>
            {toggle && <Button onClick={resetPassword}>Reset Password</Button>}
          </Col>
        </Form.Group>
      </Form>
      <div>
        {display.email ? (
          <Button onClick={handleSignOut} varient="primary">
            sign out
          </Button>
        ) : (
          <Button onClick={googleSign} varient="primary">
            sign in with google
          </Button>
        )}
      </div>
      <h4>{error}</h4>
      <div>
        <h4>{display.email}</h4>
        <h5>{display.displayName}</h5>
        <img src={display.photoURL} alt="" />
        <h6>{display.uid}</h6>
      </div>
    </div>
  );
}

export default App;
