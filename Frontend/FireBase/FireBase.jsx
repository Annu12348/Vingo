// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "vingo-de231.firebaseapp.com",
  projectId: "vingo-de231",
  storageBucket: "vingo-de231.firebasestorage.app",
  messagingSenderId: "666996834572",
  appId: "1:666996834572:web:06568da46ff4197b964929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

{/*import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // user details Firebase se milte hain
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        uid: result.user.uid,
      };

      // Redux store update karo
      dispatch(loginSuccess(user));

      console.log("Google Signup Success:", user);
    } catch (error) {
      console.error("Google Signup Error:", error);
    }
  };

  return (
    <button onClick={handleGoogleAuth}>
      Signup with Google
    </button>
  );
};

export default Register;
*/}