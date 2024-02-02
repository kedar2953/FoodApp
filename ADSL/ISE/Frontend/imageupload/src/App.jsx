// app.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import your custom CSS file

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to upload image');
      });
  };

  return (
    <div className="relative app-container mt-10 w-1/3 border rounded-lg bg-blue-400 mb-52 mt-30 max-h-60  mx-auto flex ">
      <h1 className='text-4xl font-bold absolute top-4  '>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} class="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
         ml-72 mt-16
      "/>
      <button onClick={handleUpload} className=' border-white p-2 bg-orange-400 mt-10 rounded-lg'>Upload</button>
      <ToastContainer />
    </div>
  );
};

export default App;
