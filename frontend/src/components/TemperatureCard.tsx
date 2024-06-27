import { TemperatureReading } from '@/interfaces/TemperatureReading';
import React from 'react';

interface TemperatureCardProps {
    data: TemperatureReading
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ data }) => {
    return (
        <div style={styles.card}>
            <h2>{data.temp}</h2>
            <h2>{data.time}</h2>
        </div>
    );
};

const styles = {
    card: {
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
      margin: '16px auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  };

export default TemperatureCard;