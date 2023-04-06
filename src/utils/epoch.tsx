import { useState, useEffect } from 'react';

const EpochManager = () => {
  const [currentEpoch, setCurrentEpoch] = useState(0);

  useEffect(() => {
    const fetchCurrentEpoch = async () => {
      try {
        const response = await fetch('/api/fetch_epoch');
        const data = await response.json();
        setCurrentEpoch(data.currentEpoch);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentEpoch();
  }, []);

  const saveEpochToMongoDB = async (epoch) => {
    try {
      const response = await fetch('/api/save_epoch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ epoch }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const epochTimer = setInterval(() => {
      setCurrentEpoch(epoch => {
        const newEpoch = epoch + 1;
        saveEpochToMongoDB(newEpoch);
        return newEpoch;
      });
    }, 100000);

    return () => clearInterval(epochTimer);
  }, []);

  return (
    <div>
      <p>Current Epoch: {currentEpoch}</p>
    </div>
  );
};

export default EpochManager;