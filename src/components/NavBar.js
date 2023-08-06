import React from "react";
import { css } from "@emotion/css";
import theme from "../theme";

export const NavBar = ({ clearPath, aStar, resetAll, resetObstacles, dijkstras }) => {
	return (
		<>
			<div
				className={css`
					display: flex;
					flex-direction: row;
					width: 100%;
					height: 5em;
				`}
			>
				{/* <div
					className={css`
						${theme.algoButton}
					`}
					onClick={dijkstras}
				>
					Start Dijkstra's Algorithm
				</div> */}
				<div
					className={css`
						${theme.algoButton}
						text-align: center;
					`}
					onClick={aStar}
				>
				    Start A* Search Algorithm
				</div>
				<div
					className={css`
						${theme.ultilityButton}
					`}
					onClick={clearPath}
				>
					Clear Path
				</div>
				<div
					className={css`
						${theme.ultilityButton}
					`}
					onClick={resetObstacles}
				>
					Reset Obstacles
				</div>
				<div
					className={css`
						${theme.ultilityButton}
					`}
					onClick={resetAll}
				>
					Reset All
				</div>
			</div>
		</>
	);
};
