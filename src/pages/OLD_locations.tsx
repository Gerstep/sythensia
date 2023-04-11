import React, { useState } from "react";
import useSWR from 'swr';
import EpochManager from '../utils/epoch';
import GetScenarios from "@/utils/get_scenarios";
import DefaultLayout from "@/components/DefaultLayout";
import Button from "@/components/Button";

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
    <DefaultLayout>
      <main className="flex h-full w-screen flex-row">
      <div id="content" className="z-10 flex h-screen w-full items-center justify-center p-2 px-2 sm:px-4 md:px-10">
      <div id="layout" className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between gap-3 md:justify-center">
        <div className="relative flex flex-col items-center font-mono">
          <span className="text-2xl font-bold xs:text-3xl sm:text-4xl text-gray-400">
            Available locations
          </span>
        </div>
        <Button onClick={showLocation}>{data.result[0].name}</Button>
        {showOverview && (
          <div className="text-white mb-2 mr-2 overflow-y-auto overflow-x-hidden sm-h:h-[16em] md-h:h-[21em] lg-h:h-[30em] ">
            <p>{data.result[0].overview}</p>
            <p>{data.result[0].history}</p>
            <h3>These are possible events that can happen in {data.result[0].name} in the next epoch:</h3>
              <GetScenarios epoch={currentEpoch} />
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
          </div>
        )}
      </div>
      </div>
      </main>
    </DefaultLayout>
  );
}