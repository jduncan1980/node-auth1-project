import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

export default function Users() {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/users');
			setUsers(response.data);
			// console.log(response, 'response');
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div>
			{users.map((user) => {
				return <UserCard key={user.id} username={user.username} id={user.id} />;
			})}
		</div>
	);
}
