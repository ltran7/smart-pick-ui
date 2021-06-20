import React, { useState, useEffect } from 'react';
import Ball from './BallComponent';

function Grid({ numberOfRows, numberOfColumns, limit, selectionLimit, selection, onSelection, type }) {

    const [limitReached, setLimitReached] = useState(false);

    useEffect(() => {
        setLimitReached(selection.length >= selectionLimit);
      },[selection.length, selectionLimit]);

    const handleBallSelected = (ballValue) => {
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
    };

    const renderBall = (i) => {
        var selected = selection.includes(i);
        return <Ball value={i} isSelected={selected} onBallSelected={handleBallSelected} type={type}/>;
    }

    const createGrid = () => {
        let grid = []
        var n = 0;
        for (let i = 0; i < numberOfRows; i++) {
            let children = []
            for (let j = 0; j < numberOfColumns; j++) {
                n++;
                if (n <= limit) {
                    children.push(<td>{renderBall(n)}</td>)
                }  
            }
            grid.push(<tr>{children}</tr>)
        }
        return grid
    }
    
    return (
        <div className="col-12">
            <table>
                <tbody>
                    {createGrid()}
                </tbody>
            </table>
        </div>
    );
}

export default Grid;