export function knightMoves(start, end) {
    
    if (start[0] < 0 || start[1] > 7 || end[0] < 0 || end[1] > 7) {
        throw new Error("Invalid: position is out of bounds")
    }
    
  const neighborsList = fillAdjacencyList();
  const visited = new Set();
  const parent = new Map();
  const queue = [start];
  let current;

  visited.add(start.join(","));

  while (queue.length > 0) {
    current = queue.shift();
    if (current[0] === end[0] && current[1] === end[1]) {
      break;
    }

    neighborsList.get(current.join(",")).forEach((element) => {
      if (!visited.has(element.join(","))) {
        visited.add(element.join(","));
        parent.set(element.join(","), current);
        queue.push(element);
      }
    });
  }

  const path = findPath(start, end, parent);
  const pathLength = path.length - 1;
  const steps = getSteps(path);

  const message = `
    > knightMoves([${start}],[${end}])
    => You made it in ${pathLength} moves! Here's your path: 
    
    ${steps}`;

  return message;
}

function getSteps(pathsArray) {
  let steps = "";
  while (pathsArray.length > 0) {
    steps += `[${pathsArray.shift()}]\n    `;
  }
  return steps;
}

function findPath(start, end, parentMap) {
  const pathArray = [];
  let current = end;

  while (!(current[0] === start[0] && current[1] === start[1])) {
    pathArray.push(current);
    current = parentMap.get(current.join(","));
  }

  pathArray.push(start);
  pathArray.reverse();

  return pathArray;
}

function fillAdjacencyList() {
  const chessboard = chessboardTiles();
  //   const adjacencyList = [];
  const adjacencyList = new Map();

  for (let i = 0; i < chessboard.length; i++) {
    adjacencyList.set(
      `${chessboard[i][0]},${chessboard[i][1]}`,
      availableMoves(chessboard[i])
    );
  }

  return adjacencyList;
}

function chessboardTiles() {
  const chessboard = [];

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      chessboard.push([i, j]);
    }
  }
  return chessboard;
}

function availableMoves(tile) {
  if (!Array.isArray(tile)) {
    throw new Error("Invalid: input is not an array");
  }

  const movesArray = [];

  const combinations = [
    [tile[0] + 2, tile[1] + 1],
    [tile[0] + 2, tile[1] - 1],
    [tile[0] - 2, tile[1] + 1],
    [tile[0] - 2, tile[1] - 1],
    [tile[0] + 1, tile[1] + 2],
    [tile[0] + 1, tile[1] - 2],
    [tile[0] - 1, tile[1] + 2],
    [tile[0] - 1, tile[1] - 2],
  ];

  for (const combo of combinations) {
    if (combo[0] >= 0 && combo[0] <= 7 && combo[1] >= 0 && combo[1] <= 7) {
      movesArray.push(combo);
    }
  }
  return movesArray;
}
