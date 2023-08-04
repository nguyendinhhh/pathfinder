import React, { useState, useEffect } from "react";

const Node = ({
	row,
	col,
	isStart,
	isGoal,
	isSolid,
	isOpen,
	isChecked,
	onNodeMouseDown,
	onNodeMouseEnter,
	onNodeMouseUp,
	startNodePos,
	goalNodePos,
}) => {
	const [isDragging, setIsDragging] = useState(false);

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
		outline: "1px solid #fff",
		display: "inline-block",
		cursor: isDragging ? "move" : "pointer",
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!isDragging) return;
			// Calculate the row and col based on the mouse position relative to the grid container
			const gridContainer = document.getElementById("grid-container");
			const gridRect = gridContainer.getBoundingClientRect();
			const x = e.clientX - gridRect.left;
			const y = e.clientY - gridRect.top;
			const newRow = Math.floor(y / 30)-2; // not sure why it's kinda off
			const newCol = Math.floor(x / 30)-4;
			onNodeMouseEnter(newRow, newCol, isStart, isGoal);
		};

		const handleMouseUpDocument = () => {
			setIsDragging(false);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUpDocument);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUpDocument);
		}
	}, [isDragging, onNodeMouseEnter, isStart, isGoal]);

	const handleMouseDown = () => {
		setIsDragging(true);
		onNodeMouseDown(row, col, isStart, isGoal);
	};

	const handleMouseEnter = () => {};

	const handleMouseUp = () => {
		setIsDragging(false);
		onNodeMouseUp(row, col, isStart, isGoal);
	};

	return (
		<div
			style={nodeStyles}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseUp={handleMouseUp}
		></div>
	);
};

export default Node;
