import React from 'react'
import './Balance.css'
import { useEffect } from 'react'
import { useState } from 'react'

function Balance() {
	async function getBalance() {
		const res = await fetch('http://127.0.0.1:3000')
		const data = await res.json()

		return data.balance
	}

	useEffect(() => {
		async function fetchBalance() {
			const result = await getBalance()
			console.log(result)
			setBalance(result)
		}
		fetchBalance()
	}, [])

	const [balance, setBalance] = useState(null)

	async function addHours(amount) {
		const data = {
			hours: amount,
		}

		const response = await fetch('http://127.0.0.1:3000', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
	}

	return (
		<div className='balance-card'>
			<p className='credit-balance'>Credit Balance</p>
			<h2 className='balance-amount'>{`R$ ${
				balance !== null ? balance : 'Carregando...'
			}`}</h2>
			<div className='add-button-container'>
				<button className='add-button add-hours' onClick={addHours}>
					Add 1 Hour
				</button>
				<button className='add-button add-classes'>Add Classes</button>
			</div>
		</div>
	)
}

export default Balance
