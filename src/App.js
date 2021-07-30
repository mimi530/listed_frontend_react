import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import {AuthContext} from './components/Auth/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [isAuth, setIsAuth] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    if(localStorage.getItem('remember')) {
      axios.post('auth/me').then(
        response => {
          if(response.status === 200) {
            setIsAuth(true);
            setUsername(response.data.name);
          }
        }
      ).catch(
        error => {
          setIsAuth(false);
          setUsername('');
        }
      )
    }
  }, []);
  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, username, setUsername}}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <ProtectedRoute path="/home" component={Home}/>
            <Route path="*" component={Welcome}/>
          </Switch>   
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;