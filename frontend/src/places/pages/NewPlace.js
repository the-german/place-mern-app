import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import axios from 'axios'

import './NewPlace.css'
// import { VALIDATOR_REQUIRE } from '../../shared/utils/Validator'

function NewPlace(props) {
	const auth = useContext(AuthContext)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [adress, setAdress] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	function adressHandler(event) {
		setAdress(event.target.value)
	}
	function titleHandler(event) {
		setTitle(event.target.value)
	}
	function descriptionHandler(event) {
		setDescription(event.target.value)
	}

	const placeData = {
		title,
		description,
		adress,
		creator: auth.userId,
	}
	const headers = {
		'Content-Type': 'application/json',
	}
	const history = useHistory()

	function sendData(event) {
		event.preventDefault()
		console.log(placeData)
		setIsLoading(true)
		axios
			.post('http://localhost:5000/api/places', placeData, headers)
			.then((response) => {
				console.log(response)
				if (response.statusText !== 'Created') {
					throw new Error(response.message)
				}
				setIsLoading(false)
				history.push('/')
			})
			.catch((error) => {
				console.log(error)
				setIsLoading(false)
			})
	}

	return (
		<>
			<form className='place-form' onSubmit={sendData}>
				{isLoading && <LoadingSpinner asOverlay />}
				<div className={`form-control `}>
					<label htmlFor=''>Title</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						placeholder='Enter the title please'
						onChange={titleHandler}
					/>
				</div>
				<div className={`form-control `}>
					<label htmlFor=''>Description</label>
					<textarea
						type='text'
						cols={3}
						name='description'
						id='description'
						value={description}
						placeholder='Enter the description please'
						onChange={descriptionHandler}
					/>
				</div>
				<div className={`form-control `}>
					<label htmlFor=''>Address</label>
					<input
						type='text'
						name='adress'
						id='address'
						value={adress}
						placeholder='Enter the adrdess please'
						onChange={adressHandler}
					/>
				</div>
				<Button type='submit'>ADD PLACE</Button>
			</form>
		</>
	)
}

export default NewPlace
