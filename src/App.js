import React, {useState, useEffect, useMemo, useCallback} from 'react';
import './estilo.css'

function App() {

  const[tarefas, setTarefas] = useState([
    'Pagar conta de água',
    'Pagar conta de energia'
  ]);
  const [input, setInput] = useState('');
  
  const totalTarefas = useMemo(()=>tarefas.length, [tarefas]);

  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('tarefas');
    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);

  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  },[tarefas]);

  const handledAdd = useCallback(()=>{
    setTarefas([...tarefas, input]);
    setInput('');
  }, [input, tarefas]);
  return(
  <div>
    <ul>
      {tarefas.map(tarefa =>(
        <li key={tarefa}>{tarefa}</li>
      ))}
    </ul>
    <strong>Você tem {totalTarefas} tarefas para cumprir.</strong> <br/>
    <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
    <button type="button" onClick={handledAdd}>Adicionar</button>
  </div>
    
  );
}

export default App;
