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
    <div>
      <h1>{topic.name}</h1>
      <VideoPlayer url={topic.url} />
      <ChatBot />
    </div>
  );
};

export default TopicPage;