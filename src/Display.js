import React from 'react';

const Display = (props) => {
	const { cookbooks } = props;
	console.log('my props', props);
	const loaded = () => (
		<div style={{ textAlign: 'center' }}>
			{cookbooks.map((cookbook) => (
				<article>
					<h1>Title: {cookbook.title}</h1>
					<h3>Publishing year: {cookbook.yearPublished}</h3>
					<button
						onClick={() => {
							props.selectBook(cookbook);
							props.history.push('/edit');
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteBook(cookbook);
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	);

	return cookbooks.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Display;
