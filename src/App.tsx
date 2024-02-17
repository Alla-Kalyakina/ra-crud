import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form';
import Note from './components/Note';
import uniqid from 'uniqid';

interface Form {
  id: string,
  content: string;
}

function App() {

  const [state, setState] = useState<Form>({
    id: uniqid(),
    content: '',
  });
  const [list, setList] = useState<Form[]>([]); 

  const url : string = 'http://localhost:7070/notes';

  const handlerOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prevState => {
      return {
        ...prevState,
        content: e.target.value,
      }
    })
  } 

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    addData(state);
  }

  async function getData() {
    try {
      const responce = await fetch(url);
      const json = await responce.json();
      setList(json);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  async function addData(state: {id: string, content: string}) {
    try {
      const responce = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(state),
      });
      if (responce.ok) {
        getData();
        setState((prevState => {
          return {
            ...prevState,
            content: '',
          }
        }))
      }
    } catch (error) {
     console.error("Ошибка:", error);
    }
  }

    useEffect(() => {
      getData();
    }, [list]); 

    async function deleteItem (id: string) {
      try {
        const responce = await fetch(`${url}/${id}`, {
          method: 'DELETE',
        });
        if (responce.ok) {
          getData();
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    } 


    return (
      <div className="container">
        <header className='header__container'>
          <h1 className="title__header">Notes</h1>
          <button className='btn__update' onClick={getData}>Обновить</button>        
        </header>
        <div className="list">
          {list.map((el) => (<Note key={el.id} id={el.id} text={el.content} 
          onClickDelete={() => deleteItem(el.id)}/>))}
        </div>
         <Form value={state.content} onChangeTextarea={(e) => handlerOnChange(e)} onSubmitForm={onSubmit}/>
      </div>
    );
}

export default App
