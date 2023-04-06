import React, { useState } from "react";
import Link from "next/link";
import useSWR from 'swr';
import EpochManager from '../utils/epoch';
import Scenarios from "@/utils/scenarios";

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function Location() {
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const { data, error } = useSWR("/api/data", fetcher, { refreshInterval: 30000 });
  const [showOverview, setShowOverview] = useState(false);
  const [numClicks, setNumClicks] = useState(0);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const showLocation = () => {
    setNumClicks(numClicks + 1);
    setShowOverview(numClicks % 2 === 0);
  };

  return (
    <>
      <Link href="/"> Home </Link>

      <div>
        <h1>Available locations</h1>
        <button onClick={showLocation}>{data.result[0].name}</button>
        {showOverview && (
          <>
            <p>{data.result[0].overview}</p>
            <p>{data.result[0].history}</p>
            <h3>These are possible events that can happen in {data.result[0].name} in the next epoch:</h3>
              <Scenarios epoch={currentEpoch} location={data.result[0].name} />
            <h3>The following characters can be found here:</h3>
            {data.result[0].npcs.map((item) => (
              <p>
                <b>{item.name}</b>
                <br />
                {item.description}
              </p>
            ))}

            <EpochManager setCurrentEpoch={setCurrentEpoch} />
            <p>Current Epoch (in ancestor component): {currentEpoch}</p>
          </>
        )}
      </div>
    </>
  );
}