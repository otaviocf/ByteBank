import React from 'react'
import './Balance.css'

function Balance() {
	let balance = 200

	return (
		<div className='balance-card'>
			<p className='credit-balance'>Credit Balance</p>
			<h2 className='balance-amount'>R$ {balance}</h2>
			<div className='add-button-container'>
				<button className='add-button add-hours'>Add Hours</button>
				<button className='add-button add-classes'>Add Classes</button>
			</div>
		</div>
	)
}

export default Balance
