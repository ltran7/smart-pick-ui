import Ball from '../components/BallComponent';
import {createGrid, ballSelected} from '../scripts/Grid';

describe("Grid functions", () => {

    test("it should create a new grid", () => {
        const selection = [1, 2, 3];
        const expected = [];
        const row1 = [];
        const row2 = [];
        const mockFunc = jest.fn();

        row1.push(<td>{<Ball value={1} isSelected={true} onBallSelected={mockFunc} type={"type"}/>}</td>);
        row1.push(<td>{<Ball value={2} isSelected={true} onBallSelected={mockFunc} type={"type"}/>}</td>);
        row2.push(<td>{<Ball value={3} isSelected={true} onBallSelected={mockFunc} type={"type"}/>}</td>);
        row2.push(<td>{<Ball value={4} isSelected={false} onBallSelected={mockFunc} type={"type"}/>}</td>);

        expected.push(<tr>{row1}</tr>);
        expected.push(<tr>{row2}</tr>);
        
        expect(createGrid(2, 2, 5, selection, mockFunc, "type")).toEqual(expected);
    });

    test("it should select a ball when unselected", () => {
        const selection = [1, 2, 3];
        const expected = [1, 2, 3, 4];
        const mockFunc = jest.fn();
        
        ballSelected(selection, 4, false, mockFunc);

        expect(mockFunc).toHaveBeenCalledWith(expected);
    });

    test("it should unselect a ball when selected", () => {
        const selection = [1, 2, 3];
        const expected = [2, 3];
        const mockFunc = jest.fn();
        
        ballSelected(selection, 1, false, mockFunc);

        expect(mockFunc).toHaveBeenCalledWith(expected);
    });

    test("it should not select a ball when selection limit is reached", () => {
        const selection = [1, 2, 3];
        const mockFunc = jest.fn();
        
        ballSelected(selection, 4, true, mockFunc);

        expect(mockFunc).toBeCalledTimes(0);
    });

  });