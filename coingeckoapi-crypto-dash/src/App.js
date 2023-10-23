import './App.css';
import Chatbot from './components/openai-llm-chatbot.js';
import CryptoDashboard from './components/crypto-dashboard';

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
