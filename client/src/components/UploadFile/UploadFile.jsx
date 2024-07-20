import { useState } from 'react';
import { fileReaderPromise } from '../../utils/file-reader';

const UploadFile = () => {
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);

	return (
		<>
			<form onSubmit={e => handleSubmit(e, file)}>
				<input
					type='file'
					name='photo'
					onChange={e => handleFileChange(e, setFile, setPreview)}
				/>
				<input type='submit' value='Upload' disabled={!file} />
			</form>
			{preview && <img src={preview} alt='preview' />}
		</>
	);
};

const handleFileChange = async (event, setFile, setPreview) => {
	const file = event.target.files[0];
	setFile(file);

	if (!file) return;
	setFile(file);

	try {
		const result = await fileReaderPromise(file);
		setPreview(result);
	} catch (err) {
		console.log(err);
	}
};

const handleSubmit = async (event, file) => {
	event.preventDefault();

	if (!file) {
		console.error('No file selected');
	}

	const formData = new FormData();

	formData.append('photo', file);

	try {
		const response = await fetch('http://localhost:3000/api/upload', {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error('Error uploading file:', error);
	}
};

export default UploadFile;
