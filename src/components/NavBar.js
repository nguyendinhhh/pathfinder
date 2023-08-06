import React from "react";
import { css } from "@emotion/css";
import theme from "../theme";

export const NavBar = ({ aStar, resetAll, resetObstacles }) => {
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
					Double click to<br></br>
					Start A* Search Algorithm
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
