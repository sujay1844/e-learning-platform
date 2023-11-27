import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import VideoPlayer from './VideoPlayer.jsx';
import ChatBot from './ChatBot.jsx';

const TopicPage = () => {
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicName } = useParams();

  useEffect(() => {
    fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/topic/${topicName}`)
        .then((resp) => resp.json())
      .then((response) => {
        setTopic(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching topic:', error);
      });
  }, [topicName]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{topic.name}</h1>
      <div className='flex flex-row gap-8'>

        <div className="mb-8">
          <VideoPlayer url={topic.url} />
        </div>
        <div className="mt-8">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default TopicPage;