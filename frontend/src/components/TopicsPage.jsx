import { useState, useEffect } from 'react';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Fetch topics from the backend
    fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/topics`)
      .then(resp => resp.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
      });
  }, []);

  return (
    <div>
      <h1>Select a Topic</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <a href={`/topic/${topic.name}`}>{topic.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;