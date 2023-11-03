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
			<div className="die-value">
				{props.empty ?  "" : props.value}
			</div>
		</button>
	);
}

export default Die;
