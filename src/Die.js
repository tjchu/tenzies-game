import React from 'react';


function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white"
	}

	function handleClick() {
		props.holdFunc(props.id);
	}

	return (
		<button className="die" style={styles} onClick={handleClick}>
			<div class="face">
			    <span className="pip">.</span>
			    <span className="pip">.</span>
			    <span className="pip">.</span>
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
