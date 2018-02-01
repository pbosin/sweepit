/**
 * Helper methods implementing logic of the game
 *
 * This is similar to an Angular service.
 */

/**
 * iterate over cells surrounding cell (r,c)
 *  where r is row number, c is column number, in a field (nr x nc)
 *  and invoke cell processing function fn for each neighbor
 */
function forEachNeighbor(r, c, nr, nc, fn) {
    let delta = [-1, 0, 1]; //increments to cell indices
    delta.forEach(dr => {
        let row = r + dr;
        if (row >= 0 && row < nr) {
            delta.forEach(dc => {
                let col = c + dc;
                if (col >= 0 && col < nc && (dr !== 0 || dc !== 0)) {
                    fn(row,col);
                }
            });
        }
    });
}

/**
 * create field with mines
 * @param nr - number of rows
 * @param nc - number of columns
 * @param nm - number of mines randomly placed in the field
 */
export function initField(nr, nc, nm) {
    function makeBlankField (nr,nc) {
        let rows = [];
        for (let i = 0; i < nr; i++) {
            rows.push([]);
            for (let j = 0; j < nc; j++) {
                rows[i].push({masked: true, count: 0, mine: false, marked: false});
            }
        }
        return rows;
    }
    function makeMines(n, size) {
        let mineLoc = [];
        let pos = null;
        for (let i = 1; i<=n; i++) {
            // find location, which has not been already taken
            do {
                pos = Math.floor(Math.random() * size);
            } while (mineLoc.indexOf(pos) !== -1);
            mineLoc.push(pos);
        }
        return mineLoc;
    }
    function addNeighborsCount (field, r, c, nr, nc) {
        forEachNeighbor(r, c, nr, nc, (r,c) => {
            field[r][c].count += 1;
        });
    }

    let rows = makeBlankField(nr, nc);
    let mineLocations = makeMines(nm, nr*nc);
    // return the field after placing mines using mine position in one-dimentional array.
    return mineLocations.reduce(function (allCells, mineIdx)  {
        let r = Math.floor(mineIdx/nc);
        let c = mineIdx % nc;
        allCells[r][c].mine = true;
        addNeighborsCount(allCells, r, c, nr, nc);
        return allCells;
    }, rows);
}

/**
 * check if there are still cells without mine, which needs to be revealed
 */
export function haveNonMineMasked (field) {
    return field.reduce(function (found, row) {
        return found || row.reduce(function (found, cell) {
            return found || (!cell.mine && cell.masked);
        }, false);
    }, false);
}

/**
 * given location of empty cell, recursively open neighboring empty cells
 * @param todos - queue of empty cells to be processed
 */
export function revealNeighbors (field, nr, nc, todos) {
    function processCellReveal (field, todos, cell) {
        if (field[cell.r][cell.c].masked && field[cell.r][cell.c].count === 0) {
            todos.push(cell);
        }
        field[cell.r][cell.c].masked = false;
    }

    while(todos.length) {
        let cell = todos.shift();
        let r = cell.r;
        let c = cell.c;
        forEachNeighbor(r, c, nr, nc,
            (r,c) => processCellReveal(field,todos,{r:r, c:c}));
    }
}

/**
 * Once the game is won, mark all masked mines to be shown
 * @param rows
 */
export function revealAllMines (rows) {
    return rows.map(row => {
        return row.map(cell => {
            if (cell.masked && cell.mine) {
                cell.marked = true;
            }
            return cell;
        });
    });

}