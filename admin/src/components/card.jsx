import React, { useState } from 'react';

interface CardProps {
  id: string;
  name: string;
  location: string;
  description: string;
  date: string;
  initialStatus: 'active' | 'inactive';
  imageUrl: string;
  onSave: (updatedData: Partial<CardProps>) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  location,
  description,
  date,
  initialStatus,
  imageUrl,
  onSave,
}) => {
  const [status, setStatus] = useState(initialStatus);

  const handleStatusChange = () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    setStatus(newStatus);
    onSave({ id, status: newStatus });
  };

  return (
    <div className="card">
      <img src={imageUrl || "/placeholder.svg"} alt={name} className="card-image" />
      <div className="card-content">
        <h3>{name}</h3>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Date:</strong> {date}</p>
        <p>
          <strong>Status:</strong> 
          <span className={`status ${status}`}>{status}</span>
        </p>
        <button onClick={handleStatusChange}>
          {status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

export default Card;

