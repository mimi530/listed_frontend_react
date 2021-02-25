import i18next from 'i18next';
import './App.css';
import Welcome from './pages/Welcome';

function App() {

  const handleClick = (e) => {
    alert(e.target.innerHTML);
  }

  return (
    <div className="App">
      <Welcome/>
    </div>
  );
}

export default App;
// {i18next.t('hello')}