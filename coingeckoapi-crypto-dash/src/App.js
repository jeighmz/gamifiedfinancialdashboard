import logo from './logo.svg';
import './App.css';
import Chatbot from './Chatbot.js'
import CryptoDashboard from './cryptodash';

function App() {
  return (
    <div className="App">
      <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', alignItems:'center'}}>
        <p>LLM Chatbot</p>
        <Chatbot />
        <CryptoDashboard /> 

      </div>
       
    </div>
  );
}

export default App;
