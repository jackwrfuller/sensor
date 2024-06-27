import TemperatureCard from "@/components/TemperatureCard";
import { TemperatureReading } from "@/interfaces/TemperatureReading";
import Image from "next/image";
import React from "react";

async function getTemperatureReading(): Promise<TemperatureReading> {
  const res = await fetch('http://localhost:8000/api/temp');
  if (!res.ok) {
    throw new Error('Failed to fetch reading');
  }
  const reading: TemperatureReading = await res.json();
  return reading;
};

const Home: React.FC = async () => {
  const temperatureReading = await getTemperatureReading();
  return (
    <div>
      <h1>Temperature Reading</h1>
      <TemperatureCard data={temperatureReading}/>
    </div>
  );
};

export default Home;

