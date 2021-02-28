import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Welcome}/>
        <ProtectedRoute path="/home" component={Home} isAuth={true}/>
        <Route path="/login" component={Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;