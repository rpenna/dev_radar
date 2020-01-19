/*
Concepts you need to know in React:
1) Component: Javascript function that returns HTML/CSS/Javascript content. 
    Its first letter must always be in upper case
2) Property: Informations passed by a parent component to a child component, like a HTML attribute.
3) State: Informations kept by a component.
*/

import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    };

    loadDevs();
  }, []);
  
  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
    // notation used to append a new element to an array in react
  };

  return (
    <div id="app">
      <aside>
        <strong>
          Cadastrar
        </strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
