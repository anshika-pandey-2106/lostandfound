import React, { useState } from 'react';
import Card from './Card';
import './additem.css';

const ExpandableCard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    date: '',
    imageupload: '',
    type: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsFormOpen(false);
    setSubmittedData({
      id: Date.now().toString(),
      ...formData,
      initialStatus: 'active',
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : '',
    });
  };

  const handleCardSave = (updatedData) => {
    console.log('Saving updated data:', updatedData);
    // Handle saving the data (e.g., update state or send to a server)
  };

  return (
    <div className="expandable-card">
      <div className="initial">
        <h2>ADD ITEM</h2>
        <button onClick={() => setIsFormOpen(!isFormOpen)} className="expand-button">
          {isFormOpen ? 'Close' : 'Add'}
        </button>
      </div>

      {/* Form Window */}
      {isFormOpen && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="imageupload">Image Upload:</label>
              <input
                type="file"
                id="imageupload"
                name="imageupload"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="">Select Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Render Card if data is submitted */}
      {submittedData && (
        <Card
          id={submittedData.id}
          name={submittedData.name}
          location={submittedData.location}
          description={submittedData.description}
          date={submittedData.date}
          initialStatus={submittedData.initialStatus}
          imageUrl={submittedData.imageUrl}
          onSave={handleCardSave}
        />
      )}
    </div>
  );
};

export default ExpandableCard;

