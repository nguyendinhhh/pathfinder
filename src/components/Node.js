import React from "react";

const Node = ({ row, col, isStart, isGoal, isSolid, isOpen, isChecked }) => {
	// Styles for different node types
	const nodeStyles = {
		width: "30px",
		height: "30px",
		backgroundColor: isStart
			? "green"
			: isGoal
			? "red"
			: isSolid
			? "black"
			: isOpen
			? "blue"
			: isChecked
			? "purple"
			: "lightgray",
        // border: "1px solid #ccc",
        // outline: "1px solid rgb(175, 216, 248)",
        margin: "2px",
        display: "inline-block",

	};

	return (
		<div style={nodeStyles}>
		</div>
	);
};

export default Node;
