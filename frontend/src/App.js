import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name })
      .then(res => setItems([...items, res.data]));
    setName('');
  };

  return (
    <div>
      <h1>Item List</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item, idx) => <li key={idx}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
