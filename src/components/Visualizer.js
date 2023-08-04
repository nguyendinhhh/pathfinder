import React from "react";
import Node from "./Node";
import { css } from "@emotion/css";
import theme from "../theme";

const maxRows = 30;
const maxCols = 46;

export const Visualizer = () => {
	// create a 2d array of nodes
	const createGrid = () => {
		const grid = [];
		for (let row = 0; row < maxRows; row++) {
			const currentRow = [];
			for (let col = 0; col < maxCols; col++) {
				const newNode = {
					row,
					col,
					isStart: row === 15 && col === 5,
					isGoal: row === 15 && col === 40,
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

	return (
		<>
			<div
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
								isStart={node.isStart}
								isGoal={node.isGoal}
								isSolid={node.isSolid}
								isOpen={node.isOpen}
								isChecked={node.isChecked}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};
