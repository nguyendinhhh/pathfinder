const theme = {
	algoButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "1em",
		padding: "0.7em",
		backgroundColor: "hotpink",
		borderRadius: "4px",
		color: "white",
        fontWeight: "bold",
        boxShadow: "5px 5px darkgray",
		transition: "background-color 0.3s", // Transition the background-color property
		"&:hover": {
			cursor: "pointer",
			backgroundColor: "#FF0089",
		},
	},
};

export default theme;
