import React, { useState } from 'react';
import './Scanpage.css';
import { useNavigate } from 'react-router-dom';

function ScanPage() {
  const [base64Files, setBase64Files] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const navigate=useNavigate();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Data) => {
      setBase64Files(base64Data);
    });
  };
  const handleHomepage = () => {
    navigate('/hom');
  };

  const sendIdentification = () => {
    const apiKey = 'NpkjEXeLS1hEWIuYjr6KjQXkMTuC7zT4FT0KDEEc8YhsBQpVqM';

    const data = {
      api_key: apiKey,
      images: [base64Files[0]],
      modifiers: ['crops_fast', 'similar_images'],
      plant_language: 'en',
      plant_details: [
        'common_names',
        'url',
        'name_authority',
      ],
    };

    fetch('https://api.plant.id/v2/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const firstPlantInfo = data.suggestions[0];
        if (firstPlantInfo) {
          const plantInfo = {
            commonName: firstPlantInfo.plant_name,
            scientificName: firstPlantInfo.scientific_name,
            imageUrl: base64Files[0],
          };
          setPlantData([plantInfo]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='Scan1'>
      <form className='formC'>
      <button className="home-button1" onClick={handleHomepage}>BACK</button>
        <input className="inputC" type="file" multiple onChange={handleFileChange} />
        <button className="buttonC" type="button" onClick={sendIdentification}>
          OK
        </button>
      </form>
      {plantData.length > 0 && (
        <div className='Scan2'>
          <h2>Plant Identification Results:</h2>
          <ul>
            {plantData.map((plant, index) => (
              <li key={index}>
                <strong>Common Name:</strong> {plant.commonName}<br />
                <strong>Scientific Name:</strong> {plant.scientificName}<br />
                <img src={plant.imageUrl} alt={`Plant ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScanPage;