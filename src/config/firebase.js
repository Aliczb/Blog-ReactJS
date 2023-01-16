import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBhJ2uZwP2IKWtrv2OEQlTQt_WbKXX2AB4',
  authDomain: 'blog-react-4abaa.firebaseapp.com',
  databaseURL:
    'https://blog-react-4abaa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'blog-react-4abaa',
  storageBucket: 'blog-react-4abaa.appspot.com',
  messagingSenderId: '228155252998',
  appId: '1:228155252998:web:5131acc217450b9ca1fe87',
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;
