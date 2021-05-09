import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import axios from 'axios'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'

function Users() {
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		axios
			.get('http://localhost:5000/api/users/')
			.then((response) => {
				setUsers(response.data.users)
				setIsLoading(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<>{isLoading ? <LoadingSpinner asOverlay /> : <UserList items={users} />}</>
	)
}

export default Users
