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
    <div className="container mx-auto px-4 pt-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Select a Topic</h1>
      <ul className="list-disc pl-5 space-y-3">
        {topics.map((topic, index) => (
          <li key={index} className="bg-gray-100 rounded-md p-2 hover:bg-gray-200 transition">
            <a
              href={`/topic/${topic.name}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {topic.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;