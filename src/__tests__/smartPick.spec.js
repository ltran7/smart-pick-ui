import {sortSelection, generate} from '../scripts/SmartPick';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("SmartPick functions", () => {

    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });
    
    afterEach(() => {
        mock.reset();
    });

    test("it should sort a selection", () => {
        const selection = [4, 2, 1, 5, 3];
        const expected = [[[[<span>{1}</span>, " - ", <span>{2}</span>], " - ", <span>{3}</span>], " - ", <span>{4}</span>], " - ", <span>{5}</span>];
        expect(sortSelection(selection)).toEqual(expected);
    });

    test("it should not sort when selection is empty", () => {
        const selection = [];
        const expected = [];
        expect(sortSelection(selection)).toEqual(expected);
    });

    it("it should generate numbers and stars", async () => {
        const selectedNumbers = [1, 2, 3];
        const selecteStars = [1, 2];
        const isClicked = true;
        const setIsClickedAction = jest.fn();
        const setSelectedNumbers = jest.fn();
        const setSelectedStars = jest.fn();
        const setProbabilityOfSuccess = jest.fn();
        const translatedText = "translatedText";
        const data = "[{\"number\":1,\"type\":\"NUMBER\"},{\"number\":2,\"type\":\"NUMBER\"},{\"number\":3,\"type\":\"NUMBER\"},{\"number\":1,\"type\":\"STAR\"},{\"number\":2,\"type\":\"STAR\"}]";
        const response = { "balls": [
            {
                "number": 1,
                "type": "NUMBER"
            },
            {
                "number": 2,
                "type": "NUMBER"
            },
            {
                "number": 3,
                "type": "NUMBER"
            },
            {
                "number": 4,
                "type": "NUMBER"
            },
            {
                "number": 5,
                "type": "NUMBER"
            },
            {
                "number": 1,
                "type": "STAR"
            },
            {
                "number": 1,
                "type": "STAR"
            }
        ], 
        "probability": 4.1
        };

        mock.onPost('http://localhost:8080/smart-pick/draw?nbOfNumbers=5&nbOfStars=2', [{ number: 1, type: 'NUMBER' },{ number: 2, type: 'NUMBER' },{ number: 3, type: 'NUMBER' },{ number: 1, type: 'STAR' },{ number: 2, type: 'STAR' }]).reply(200, response);

        await generate(selectedNumbers, selecteStars, isClicked, setIsClickedAction, setSelectedNumbers, setSelectedStars, setProbabilityOfSuccess, translatedText);

        expect(mock.history.post[0].url).toEqual('http://localhost:8080/smart-pick/draw?nbOfNumbers=5&nbOfStars=2');
        expect(mock.history.post[0].data).toEqual(data);
    });

});