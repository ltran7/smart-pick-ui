import Ball from '../components/BallComponent';

export function createGrid(numberOfRows, numberOfColumns, limit, selection, handleBallSelected, type) {
    let grid = [];
    var n = 0;
    for (let i = 0; i < numberOfRows; i++) {
        let children = [];
        for (let j = 0; j < numberOfColumns; j++) {
            n++;
            if (n <= limit) {
                var selected = selection.includes(n);
                children.push(<td>{<Ball value={n} isSelected={selected} onBallSelected={handleBallSelected} type={type}/>}</td>);
            }  
        }
        grid.push(<tr>{children}</tr>);
    }
    return grid;
}

export function ballSelected(selection, ballValue, limitReached, onSelection) {
    if (selection.includes(ballValue)) {
        var array = [...selection]; 
        var index = selection.indexOf(ballValue);
        if (index !== -1) {
            array.splice(index, 1);
            onSelection(array);
        }
    } else {
        if (!limitReached) {
            onSelection([...selection, ballValue]);
        }
    }
}