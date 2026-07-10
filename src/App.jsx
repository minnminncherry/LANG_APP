import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Backend not running yet.'));
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Lang App</h1>
      <p>React frontend connected to a Python backend.</p>
      <p>{message}</p>
    </main>
  );
}

export default App;
