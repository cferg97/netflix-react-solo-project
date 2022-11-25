import "./Styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navigation from "./components/NavBar";
import NetflixFooter from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <NetflixFooter />
    </div>
  );
}

export default App;
