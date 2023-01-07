import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useUserId } from "./userIdContext";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCEQvRtbpj_aT1hhMN3dlVeLp6w6DM4aJs",
    authDomain: "greydive-challenge-67010.firebaseapp.com",
    projectId: "greydive-challenge-67010",
    storageBucket: "greydive-challenge-67010.appspot.com",
    messagingSenderId: "721523248676",
    appId: "1:721523248676:web:e216fc1306656c817f52b1",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { setUserId } = useUserId();

  const firebase = {
    addData: async function addData(name, email, date, country) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          date: date,
          country: country,
        });
        setUserId(docRef._key.path.segments[1]);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    getData: async function getData(id) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return "Hubo un error :(";
      }
    },
  };

  return firebase;
};

export default useFirebase;
