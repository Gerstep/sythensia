import React, { useState } from "react";
import Link from "next/link";
import useSWR from 'swr';

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function Location() {
  const { data, error } = useSWR("/api/data", fetcher, { refreshInterval: 30000 });
  const [showOverview, setShowOverview] = useState(false);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const showLocation = () => {
    setShowOverview(true);
  }

  return (
    <>
      <Link href="/"> Home </Link>

      <div>
        <h1>Available locations</h1>
        {data.result.map((item) => (
          <button onClick={showLocation}>{item.name}</button>
        ))}
        {showOverview && <p>{data.result[0].overview}</p>}
        {showOverview && <p>{data.result[0].history}</p>}
      </div>
    </>
  );
}