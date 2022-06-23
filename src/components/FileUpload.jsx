import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name)

  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if(err.response.status === 500) {
        console.log('there was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div className='custom-file'>
                <input type='file' className='custom-file-imput' onChange={onChange} />
                <label className='custom-file-label'>
                  {fileName}
                </label>
            </div>
            <input type='submit' value='upload' />
        </form>
    </>
  )
}

export default FileUpload
