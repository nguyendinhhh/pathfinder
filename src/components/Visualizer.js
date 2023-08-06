import React, { useState } from "react";
import Node from "./Node";
import { NavBar } from "./NavBar";
import { css } from "@emotion/css";

const maxRows = 30;
const maxCols = 40;
let goalReached = false;
const startNodeLocation = { row: maxRows / 2 + 1, col: 4 };
const goalNodeLocation = { row: maxRows / 2 + 1, col: maxCols - 5 };

export const Visualizer = () => {
	const [startNodePos, setStartNodePos] = useState(startNodeLocation);
	const [goalNodePos, setGoalNodePos] = useState(goalNodeLocation);
	const [isDrawing, setIsDrawing] = useState(false); // New state for drawing solid nodes
	const [grid, setGrid] = useState(createGrid()); // Use state for grid
	const [openList, setOpenList] = useState([]);

	// create a 2d array of nodes
	function createGrid() {
		const grid = [];
		for (let row = 0; row < maxRows; row++) {
			const currentRow = [];
			for (let col = 0; col < maxCols; col++) {
				const newNode = {
					row,
					col,
					isStart:
						row === startNodeLocation.row && col === startNodeLocation.col,
					isGoal: row === goalNodeLocation.row && col === goalNodeLocation.col,
					isSolid: false,
					isChecked: false,
					inPath: false,
					prev: null,
					gCost: -1,
					hCost: -1,
					fCost: -1,
				};
				currentRow.push(newNode);
			}
			grid.push(currentRow);
		}
		return grid;
	}

	// event handlers for dragging the start node and the goal node
	const handleNodeMouseDown = (row, col, isStart, isGoal) => {
		if (isStart) {
			setStartNodePos({ row, col });
		} else if (isGoal) {
			setGoalNodePos({ row, col });
		} else {
			setIsDrawing(true);
			handleNodeMouseEnter(row, col, false, false); // Call handleNodeMouseEnter directly to set the node to solid on click
		}
	};

	const handleNodeMouseEnter = (row, col, isStart, isGoal) => {
		if (isStart) {
			setStartNodePos({ row, col });
		} else if (isGoal) {
			setGoalNodePos({ row, col });
		} else if (isDrawing && !isStart && !isGoal) {
			setGrid((prevGrid) =>
				prevGrid.map((r, rowIndex) =>
					r.map((node, colIndex) =>
						rowIndex === row && colIndex === col
							? { ...node, isSolid: true }
							: node
					)
				)
			);
		}
	};

	const handleNodeMouseUp = (row, col, isStart, isGoal) => {
		setIsDrawing(false);
	};

	const getHeuristic = (nodeA, nodeB) => {
		const dx = Math.abs(nodeA.col - nodeB.col);
		const dy = Math.abs(nodeA.row - nodeB.row);
		return dx + dy;
    };
    
    const dijkstraSAlgorithm = () => {
        console.log("test")
    }

	// A* search algorithm
    const aStarAlgorithm = () => {

		if (!goalReached) {
			const startNode = grid[startNodePos.row][startNodePos.col];
			const goalNode = grid[goalNodePos.row][goalNodePos.col];

			setOpenList([startNode]);
			const closedList = [];

			while (openList.length > 0 && !goalReached) {
				// Find the node with the lowest fCost in the openList
				let currentNode = openList[0];
				for (let i = 1; i < openList.length; i++) {
					if (openList[i].fCost < currentNode.fCost) {
						currentNode = openList[i];
					}
				}

				// Move currentNode from openList to closedList
				openList.splice(openList.indexOf(currentNode), 1);
				closedList.push(currentNode);
				currentNode.isChecked = true;

				// If the goal node is found, backtrack the path and set inPath property
                if (currentNode === goalNode) {
					goalReached = true;
					let current = goalNode;
                    while (current && current !== startNode) {
                        current.inPath = true;
						current = current.prev;
					}
					return;
				}

				// Generate neighbors
				const neighbors = [];
				const { row, col } = currentNode;
				if (row > 0) neighbors.push(grid[row - 1][col]);
				if (row < maxRows - 1) neighbors.push(grid[row + 1][col]);
				if (col > 0) neighbors.push(grid[row][col - 1]);
				if (col < maxCols - 1) neighbors.push(grid[row][col + 1]);

				// Process neighbors
				for (const neighbor of neighbors) {
					if (neighbor.isSolid || closedList.includes(neighbor)) continue;

					const tentativeGCost = currentNode.gCost + 1; // Assuming uniform edge cost = 1

					if (!openList.includes(neighbor) || tentativeGCost < neighbor.gCost) {
						neighbor.gCost = tentativeGCost;
						neighbor.hCost = getHeuristic(neighbor, goalNode);
						neighbor.fCost = neighbor.gCost + neighbor.hCost;
						neighbor.prev = currentNode;

						if (!openList.includes(neighbor)) {
							openList.push(neighbor);
						}
					}
				}
			}
		}
    };
    
    const clearPath = () => {
        const newGrid = grid.map((row) => (
            row.map(node => ({
                ...node,
                isChecked: false,
                inPath: false,
            }))
        ))
        setGrid(newGrid)
        goalReached = false;
    }

	const resetAll = () => {
		setStartNodePos(startNodeLocation);
		setGoalNodePos(goalNodeLocation);
        setGrid(createGrid());
        goalReached = false;
	};

	const resetObstacles = () => {
        setGrid(createGrid());
        goalReached = false;
	};

	return (
		<>
            <NavBar
                clearPath={clearPath}
				resetAll={resetAll}
                aStar={aStarAlgorithm}
                dijkstras={dijkstraSAlgorithm}
				resetObstacles={resetObstacles}
			/>
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
								isChecked={node.isChecked}
								inPath={node.inPath}
								onNodeMouseDown={handleNodeMouseDown}
								onNodeMouseEnter={handleNodeMouseEnter}
								onNodeMouseUp={handleNodeMouseUp}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};
