import React, { useState, useEffect } from 'react';
import { ballSelected, createGrid } from '../scripts/Grid';

function Grid({ numberOfRows, numberOfColumns, limit, selectionLimit, selection, onSelection, type }) {

    const [limitReached, setLimitReached] = useState(false);

    useEffect(() => {
        setLimitReached(selection.length >= selectionLimit);
      },[selection.length, selectionLimit]);

    const handleBallSelected = (ballValue) => {
        ballSelected(selection,ballValue, limitReached, onSelection);
    };
    
    return (
        <div className="col-12">
            <table>
                <tbody>
                    {createGrid(numberOfRows, numberOfColumns, limit, selection, handleBallSelected, type)}
                </tbody>
            </table>
        </div>
    );
}

export default Grid;