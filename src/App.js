import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: 'http://github.com/raffo',
      techs: ["ReactJS", "Node"]
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);
    const repoIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repoIndex, 1);
    setRepositories([...repositories ]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>  
          </li>)}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
