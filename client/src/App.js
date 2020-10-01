import React from 'react';
import { Container } from '@material-ui/core';
import Form from './components/Form';
import Users from './components/Users';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Container>
			<Switch>
				<Route exact path='/'>
					<Form url='login' />
				</Route>
				<Route exact path='/register'>
					<Form url='register' />
				</Route>
				<Route exact path='/users'>
					<Users />
				</Route>
			</Switch>
		</Container>
	);
}

export default App;
