import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { FirebaseAppProvider } from 'reactfire'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderLayer from './view/ProviderLayer.jsx'
const firebaseConfig = {
  apiKey: "AIzaSyDen5V691Npg7jDRE6NsLYGuDFKWAD9jws",
  authDomain: "bike-app-61c94.firebaseapp.com",
  projectId: "bike-app-61c94",
  storageBucket: "bike-app-61c94.appspot.com",
  messagingSenderId: "317712601143",
  appId: "1:317712601143:web:b4230872c3254688716fb2"
};



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
