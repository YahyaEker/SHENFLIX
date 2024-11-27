import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCL92FzMiISLrIVMx8nvqgSnPTVNNaewZM",
  authDomain: "shenflix-65b63.firebaseapp.com",
  projectId: "shenflix-65b63",
  storageBucket: "shenflix-65b63.appspot.com",
  messagingSenderId: "307466749019",
  appId: "1:307466749019:web:2b287755c4aa5820fbeb7e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email ,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ") )
    }
}

const login = async(email, password)=>{
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout}
