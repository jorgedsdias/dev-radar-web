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
  const [currentDev, setCurrentDev] = useState('');

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(id, data) {
    if(!id) {
      const response = await api.post('/devs', data);
      setDevs([...devs, response.data]);
    } else {
      const response = await api.put(`/devs/${id}`, data);
      setDevs(devs.map(dev => dev._id === id ? { ...response.data } : dev));
    }
  }

  async function handleRemoveDev(id) {
    await api.delete(`/devs/${id}`);

    setDevs(devs.filter(dev => dev._id !== id));
  }

  function handleEditDev(dev) {
    setCurrentDev(dev);
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm 
          onSubmit={handleAddDev}
          currentDev={currentDev}
        />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              key={dev._id} 
              dev={dev}
              handleEditDev={handleEditDev}
              handleRemoveDev={handleRemoveDev}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;