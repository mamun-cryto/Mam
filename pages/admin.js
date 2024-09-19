import { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.tasks));
  }, []);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, coins }),
    });

    if (response.ok) {
      setTasks([...tasks, { task, coins }]);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          placeholder="New Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Coins"
          value={coins}
          onChange={(e) => setCoins(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>

      <h3>Existing Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.task} - {task.coins} coins</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;