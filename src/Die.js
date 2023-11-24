import React from 'react';
import {nanoid} from "nanoid"


function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white"
	}

	function handleClick() {
		props.holdFunc(props.id);
	}


	// Utilizing css grid layout, each specific dice dot is laid out in the right position according to the CSS
	const pips = []

	for (let i = 0; i < props.value; i++) {
		pips.push(<div key={nanoid()} className="dot"></div>);
	}

	return (
		<button className="die" style={styles} onClick={handleClick}>
			<div class="face">
				{props.isEmpty ?  "" : pips}
			</div>
		</button>
	);
}

/*
<div className="die-value">
	{props.isEmpty ?  "" : props.value}
</div>
*/

export default Die;
