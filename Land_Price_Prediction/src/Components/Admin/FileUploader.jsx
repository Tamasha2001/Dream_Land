import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import './FileUploader.css'; // Optional: Create a CSS file for styling

function FileUploader() {
  const [image, setImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const htmlString = XLSX.utils.sheet_to_html(worksheet);
        generateImageFromHTML(htmlString);
      };
      reader.readAsBinaryString(file);
    }
  };

  const generateImageFromHTML = (htmlString) => {
    const container = document.createElement('div');
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    html2canvas(container).then((canvas) => {
      setImage(canvas.toDataURL('image/png'));
      document.body.removeChild(container);
    });
  };

  return (
    <div className="file-uploader">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {image && <img src={image} alt="Excel Data" className="excel-image" />}
    </div>
  );
}

export default FileUploader;
