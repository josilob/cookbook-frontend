import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	// URL variable
	const url = 'http://localhost:4000';

	// STATE TO HOLD Books
	const [cookbooks, setCookbooks] = React.useState([]);

	// Empty book for form
	const emptyCkb = {
		title: '',
		yearPublished: 0,
	};
	const [selectedBook, setSelectedBook] = React.useState(emptyCkb);

	//FETCH BOOKS
	const getBooks = () => {
		fetch(url + '/api/cookbooks/')
			.then((response) => response.json())
			.then((data) => {
				setCookbooks(data.data);
				console.log('data from getBooks', data);
			});
	};

	//GET COOKBOOKS ON PAGE LOAD
	React.useEffect(() => {
		getBooks();
	}, []);

	// // handleCreate function for creating cookbooks
	const handleCreate = (newBook) => {
		fetch(url + '/api/cookbooks/' + newBook._id, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newBook),
		}).then((response) => getBooks());
	};

	// //handleUpdate to update a cookbook when form is clicked
	const handleUpdate = (cookbook) => {
		fetch(url + '/api/cookbook/' + cookbook._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cookbook),
		}).then((response) => getBooks());
	};

	// //selectBook which selects a cookbook
	const selectBook = (cookbook) => {
		setSelectedBook(cookbook);
	};

	// //deleteBook function to delete a ckb
	const deleteBook = (cookbook) => {
		fetch(url + '/cookbook/' + cookbook._id, {
			method: 'delete',
		}).then((response) => getBooks());
	};

	return (
		<div className='App'>
			<h1>Cookbooks</h1>
			<Link to='/create'>
				<button>Add Cookbook</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(routerProps) => (
							<Display
								{...routerProps}
								cookbooks={cookbooks}
								selectBook={selectBook}
								deleteBook={deleteBook}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(routerProps) => (
							<Form
								{...routerProps}
								label='create'
								cookbook={{ emptyCkb }}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(routerProps) => (
							<Form
								{...routerProps}
								label='update'
								cookbook={selectedBook}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
