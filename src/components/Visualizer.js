import React, { useState } from "react";
import Node from "./Node";
import { css } from "@emotion/css";
import theme from "../theme";

const maxRows = 30;
const maxCols = 46;
const startNodeLocation = { row: 15, col: 4 };
const goalNodeLocation = { row: 15, col: 41 };

export const Visualizer = () => {
	const [startNodePos, setStartNodePos] = useState(startNodeLocation);
	const [goalNodePos, setGoalNodePos] = useState(goalNodeLocation);

	// create a 2d array of nodes
	const createGrid = () => {
		const grid = [];
		for (let row = 0; row < maxRows; row++) {
			const currentRow = [];
			for (let col = 0; col < maxCols; col++) {
				const newNode = {
					row,
					col,
					isStart:
						row === startNodeLocation.row && col === startNodeLocation.col, // this will return true once we get to the coordinates
					isGoal: row === goalNodeLocation.row && col === goalNodeLocation.col,
					isSolid: false,
					isOpen: false,
					isChecked: false,
				};
				currentRow.push(newNode);
			}
			grid.push(currentRow);
		}
		return grid;
	};

	// create grid
	const grid = createGrid();

	// event handlers for dragging the start node and the goal node
	const handleNodeMouseDown = (row, col, isStart, isGoal) => {
		if (isStart) {
			setStartNodePos({ row, col });
		} else if (isGoal) {
			setGoalNodePos({ row, col });
        }
        console.log(row, " ", col)
	};

	const handleNodeMouseEnter = (row, col, isStart, isGoal) => {
		if (isStart) {
			setStartNodePos({ row, col });
		} else if (isGoal) {
			setGoalNodePos({ row, col });
        }
        console.log(row, " ", col);
	};

	const handleNodeMouseUp = () => {
		// Any additional logic when the dragging stops (if needed)
	};

	return (
		<>
            <div
                id="grid-container"
				className={css`
					margin-top: 2em;
					display: grid;
					gap: 1px;
					justify-content: center;
					align-items: center;
					background-color: white;
				`}
			>
				{grid.map((row, rowIndex) => (
					<div key={rowIndex}>
						{row.map((node, colIndex) => (
							<Node
								key={`node-${rowIndex}-${colIndex}`}
								row={rowIndex}
								col={colIndex}
								isStart={
									rowIndex === startNodePos.row && colIndex === startNodePos.col
								}
								isGoal={
									rowIndex === goalNodePos.row && colIndex === goalNodePos.col
								}
								isSolid={node.isSolid}
								isOpen={node.isOpen}
								isChecked={node.isChecked}
								onNodeMouseDown={handleNodeMouseDown}
								onNodeMouseEnter={handleNodeMouseEnter}
								onNodeMouseUp={handleNodeMouseUp}
								startNodePos={startNodePos}
								goalNodePos={goalNodePos}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};
