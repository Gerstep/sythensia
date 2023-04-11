import React, { useState } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import Button from "@/components/Button";
import { useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

const generateLocation = async () => {
  try {
    const new_location = await axios.get('/api/gen_locations');
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

const LocationList = ({ locations, onSelectLocation }) => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-2">Locations</h2>
    {locations.map((location) => (
      <Button key={location.name} className="w-full mb-2" onClick={() => onSelectLocation(location)}>
        {location.name}
      </Button>
    ))}
      <Button onClick={() => generateLocation()} className="bg-cyan-500">Create New Location</Button>
  </div>
);

const LocationDetails = ({ location }) => (
  <div className="p-4">
    <h2 className="text-xl font-medium mb-2">{location.name}</h2>
    <p className="text-gray-200">{location.descr}</p>
    <Button className="mx-auto my-4 w-1/2 bg-gray-400 hover:animate-pulse flex items-center justify-center">
      <Link href={`/game?locationName=${location.name}&locationDescription=${location.descr}`}>
        <span className="text-center">Enter {location.name}</span>
      </Link>
    </Button>
  </div>
);

const Location = () => {
  const [locations, setLocations] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [loading, setLoading] = useState(true);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const {data} = await axios.get('/api/fetch_locations');
        setLocations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Choose location 0 automatically when page loaded
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0]);
    }
  }, [locations, selectedLocation]);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div className="w-screen flex">
        <div className="w-1/4 text-white font-mono">
          <LocationList locations={locations} onSelectLocation={handleLocationClick}  />
        </div>
        <div className="w-3/4 text-white font-mono">
          {selectedLocation ? (
            <LocationDetails location={selectedLocation} />
          ) : (
            <p>select</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Location;