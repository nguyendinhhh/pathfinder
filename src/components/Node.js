class Node {

    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.isStart = false;
        this.isGoal = false;
        this.isSolid = false;
        this.isOpen = false;
        this.isChecked = false;

        // for A* search algo
        this.gCost = -1;
        this.hCost = -1;
        this.fCost = -1;

        this.prevNode = null;
    }
}

export default Node;