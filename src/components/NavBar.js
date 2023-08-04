import React from 'react'
import {css} from "@emotion/css"
import theme from "../theme";

export const NavBar = () => {
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
					<div
						className={css`
							${theme.algoButton}
						`}
					>
						Start Dijkstra's Algorithm
					</div>
					<div
						className={css`
							${theme.algoButton}
						`}
					>
						Start A* Search Algorithm
					</div>
                    
				</div>
			</>
		);
}
