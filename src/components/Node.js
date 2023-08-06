import React, { useState, useEffect } from "react";
const maxRows = 30;
const maxCols = 46;
const Node = ({
	row,
	col,
	isStart,
	isGoal,
	isSolid,
	isChecked,
	inPath,
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
			? "blue"
			: isGoal
			? "red"
			: isSolid
			? "black"
			: inPath
			? "green"
			: isChecked
			? "pink"
			: "white",
		outline: "1px solid #000",
        display: "inline-block",
        margin: 0,
		cursor: isDragging ? "move" : "pointer",
	};

	const clamp = (value, min, max) => {
		return Math.min(Math.max(value, min), max);
	};

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!isDragging) return;
			// Calculate the row and col based on the mouse position relative to the grid container
			const gridContainer = document.getElementById("grid-container");
			const gridRect = gridContainer.getBoundingClientRect();
			const x = e.clientX - gridRect.left;
			const y = e.clientY - gridRect.top;
			// Calculate the new row and column (clamped within the grid boundaries)
			const newRow = clamp(Math.floor(y / 30) - 2, 0, maxRows - 1);
			const newCol = clamp(Math.floor(x / 30) - 10, 0, maxCols - 1);

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
