import {useState} from 'react'

function Tarefa(props) {
  return(
    <div className="atividade">
        <p onClick={()=>props.handleComplete(props.id)} 
        style={{textDecoration : props.completa ? 'line-through' : ' '}}
        >
          {props.children}
        </p>
        <img src="./assets/delete.svg" onClick={()=> props.handleDelete(props.id)} alt="Delete" />
    </div>
  )
}


function App() {
  const [task, setTask] = useState([]);
  const [completas, setCompletas] = useState(false)
  const [ativas, setAtivas] = useState(false)
  
  function handleKeyDown(event) {
    if(event.key !=='Enter')return

    const novoTask = [...task, {id: Math.random(), task: event.target.value, completa: false}];
    setTask(novoTask);

    event.target.value = '';
  }

  function handleDelete(id){
    const deleteTask = task.filter(x=> x.id !== id)
    setTask(deleteTask);
  }

  function handleComplete(id){
    const novaTask = [...task];
    const completTask = novaTask.find(tarefa=>{
      return tarefa.id === id
    })
    completTask.completa = !completTask.completa
    setTask (novaTask)
  }
  function contagem(){
    const cont = task.filter(x=> x.completa === false);
    return cont
  }

  function active(){
    setAtivas(true)
    setCompletas(false)  
  }
  function complete(){
    setCompletas(true);
    setAtivas(false);
  }
  function all(){
    setCompletas(false);
    setAtivas(false);
  }
  function clearComplete(){
    const novaTask = task.filter(x=> x.completa === false)
    setTask(novaTask)
  }

  return (
    <div className="App">
      <img className="back" src="./assets/background.jpg" alt="background" />
      <div className="container">
        <h1>TAREFAS</h1>
        <input onKeyDown={handleKeyDown} type="text" placeholder="Criar uma nova tarefa" />
        <div className="tarefas">

          {task.filter(x=>{
            if(ativas){
              return x.completa === false;
            }
            else if(completas){
              return x.completa === true;
            }
            return x
          }).map (function (tarefa){
            return(
              <Tarefa 
              key={tarefa.id} 
              id={tarefa.id} 
              handleDelete={handleDelete} 
              handleComplete={handleComplete}
              completa = {tarefa.completa}
              >
                {tarefa.task}
              </Tarefa>
            ) 
          })}
          <div className="menu">
            <p>{`${contagem().length} Itens restantes`}</p>
            <button onClick={()=>all()} style= {{color: !ativas && !completas ? '#3A7CFD' : '#9495A5'}}>Todas</button>
            <button onClick={()=>active()} style= {{color: ativas ? '#3A7CFD' :'#9495A5' }}>Ativas</button>
            <button onClick={()=> complete()} style= {{color: completas ? '#3A7CFD' :'#9495A5' }}>Completada</button>
            <button onClick={()=> clearComplete()}>Limpar Completadas</button>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default App;
