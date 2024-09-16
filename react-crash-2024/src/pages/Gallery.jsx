import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { firebaseApp } from '../firebaseConfig';
import 'tailwindcss/tailwind.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { TailSpin } from 'react-loader-spinner'; // Import spinner component

const storage = getStorage(firebaseApp);

const Gallery = () => {
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const listRef = ref(storage, 'images/');
        const res = await listAll(listRef);
        const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      setUploading(true);
      const imageRef = ref(storage, `images/${image.name}`);
      try {
        await uploadBytes(imageRef, image);
        alert('Image uploaded successfully!');
        setImage(null);
        // Refresh images
        const listRef = ref(storage, 'images/');
        const res = await listAll(listRef);
        const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));
        setImageUrls(urls);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      setUploading(false);
    }
  };

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${url.split('/').pop().split('?')[0]}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();
      const folder = zip.folder('images');

      for (const url of imageUrls) {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = `${url.split('/').pop().split('?')[0]}.png`;
        folder.file(fileName, blob);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'images.zip');
    } catch (error) {
      console.error('Error downloading all images:', error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Gallery</h1>
      <div className="max-w-4xl mx-auto bg-stone-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
        <div className="flex flex-col items-center mb-6">
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="mb-4 p-2 bg-red-700 border border-red-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button 
            onClick={handleUpload} 
            className="py-2 px-4 bg-red-700 border border-red-600 rounded-lg text-white hover:bg-red-600 transition-colors"
            disabled={uploading}
          >
            {uploading ? <TailSpin height="24" width="24" color="white" /> : 'Upload'}
          </button>
        </div>
        <button
          onClick={handleDownloadAll}
          className="py-2 px-4 bg-red-800  rounded-lg text-white hover:bg-green-600 transition-colors mt-4"
        >
          Download All
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <TailSpin height="80" width="80" color="white" />
        </div>
      ) : (
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`Uploaded ${index}`} 
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleDownload(url)} 
                  className="text-white text-lg font-semibold px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
