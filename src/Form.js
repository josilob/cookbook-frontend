import React from 'react';

const Form = (props) => {
	//STATE FOR THE FORM
	const [formData, setFormData] = React.useState(props.cookbook);

	//FUNCTIONS
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent Form from Refreshing
		props.handleSubmit(formData); // Submit to Parents desired function
		props.history.push('/'); //Push back to display page
		// above line changes URL path
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.value });
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
				type='text'
				name='publishing-year'
				value={formData.yearPublished}
				onChange={handleChange}
				placeholder='Publishing Year'
			/>

			<input type='submit' value={props.label} />
		</form>
	);
};

export default Form;
