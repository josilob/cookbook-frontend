import React from 'react';

const Form = (props) => {
	//STATE FOR THE FORM
	console.log('my props in form - ', props);
	const [formData, setFormData] = React.useState(props.cookbook);

	//FUNCTIONS
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push('/'); //Push back to display page
		// above line changes URL path
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='title'
				value={formData.title}
				onChange={handleChange}
				placeholder='Book Title'
			/>
			<input
				type='number'
				name='yearPublished'
				value={formData.yearPublished}
				onChange={handleChange}
				placeholder='Publishing Year'
			/>

			<input type='submit' value={props.label} />
		</form>
	);
};

export default Form;
