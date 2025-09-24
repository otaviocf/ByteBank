import React from 'react'
import './Balance.css'
import { useEffect } from 'react'
import { useState } from 'react'

function Balance() {
	async function fetchBalanceFromAPI() {
		const res = await fetch('http://127.0.0.1:3000')
		const data = await res.json()
		console.log(data)

		return data.balance
	}

	async function getBalance() {
		const balance = await fetchBalanceFromAPI()
		return balance
	}

	useEffect(() => {
		async function helperGetBalance() {
			const balance = await fetchBalanceFromAPI()
			return balance
		}
		helperGetBalance().then((value) => setBalance(value))
	}, [])

	const [balance, setBalance] = useState()
	const [hoursValue, setHoursValue] = useState(0)
	const [classesValue, setClassesValue] = useState(0)
	const [pagesValue, setPagesValue] = useState(0)

	async function addCredits(amount, type) {
		const data = {
			amount,
			type,
		}

		const res = await fetch('http://127.0.0.1:3000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const body = await res.json()
		console.log(body)
		setBalance(body.balance)
	}

	return (
		<div className='balance-card'>
			<p className='credit-balance'>Credit Balance</p>
			<h2 className='balance-amount'>{`R$ ${
				balance !== undefined ? balance : 'Carregando...'
			}`}</h2>

			{/* Add hours section ⏳ */}
			<div className='add-button-container'>
				<input
					type='number'
					value={hoursValue}
					min={1}
					max={10}
					className='number-input'
					readOnly
				/>
				<div className='up-down-arrows'>
					<button className='up-arrow' onClick={() => setHoursValue(hoursValue + 1)}>
						<i className='fa-solid fa-angle-up'></i>
					</button>
					<button
						className={`down-arrow ${hoursValue === 0 && 'disabled'}`}
						onClick={() => {
							if (hoursValue === 0) return
							setHoursValue(hoursValue - 1)
						}}
					>
						<i className='fa-solid fa-angle-down'></i>
					</button>
				</div>
				<button
					className='add-button add-classes'
					onClick={() => {
						addCredits(hoursValue, 'hours')
						setHoursValue(0)
					}}
				>
					Add Hours ⏳
				</button>
			</div>

			{/* Add classes section 📝 */}
			<div className='add-button-container'>
				<input
					type='number'
					value={classesValue}
					min={1}
					max={10}
					className='number-input'
					readOnly
				/>
				<div className='up-down-arrows'>
					<button
						className={'up-arrow'}
						onClick={() => setClassesValue(classesValue + 1)}
					>
						<i className='fa-solid fa-angle-up'></i>
					</button>
					<button
						className={`down-arrow ${classesValue === 0 && 'disabled'}`}
						onClick={() => {
							if (classesValue === 0) return
							setClassesValue(classesValue - 1)
						}}
					>
						<i className='fa-solid fa-angle-down'></i>
					</button>
				</div>
				<button
					className='add-button add-classes'
					onClick={() => {
						addCredits(classesValue, 'classes')
						setClassesValue(0)
					}}
				>
					Add Classes 📝
				</button>
			</div>

			{/* Add pages section 📖 */}
			<div className='add-button-container'>
				<input
					type='number'
					value={pagesValue}
					min={1}
					max={10}
					className='number-input'
					readOnly
				/>
				<div className='up-down-arrows'>
					<button className={'up-arrow'} onClick={() => setPagesValue(pagesValue + 10)}>
						<i className='fa-solid fa-angle-up'></i>
					</button>
					<button
						className={`down-arrow ${pagesValue === 0 && 'disabled'}`}
						onClick={() => {
							if (pagesValue === 0) return
							setPagesValue(pagesValue - 10)
						}}
					>
						<i className='fa-solid fa-angle-down'></i>
					</button>
				</div>
				<button
					className='add-button add-classes'
					onClick={() => {
						addCredits(pagesValue, 'pages')
						setPagesValue(0)
					}}
				>
					Add Pages 📖
				</button>
			</div>
		</div>
	)
}

export default Balance
