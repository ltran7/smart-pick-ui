import axios from 'axios';
import AnimatedProgressProvider from '../components/AnimatedProgressProviderComponent';
import { CircularProgressbarWithChildren }  from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';

export function sortSelection(selection) {
    if (selection.length >= 1) {
        return selection
        .sort((a, b) => a > b ? 1 : -1)
        .map(t => <span>{t}</span>)
        .reduce((previous, current) => [previous, ' - ', current])
    }
    return selection;
}

export function computeProbability(probabilityOfSuccess, translatedText) {
    return (
        <AnimatedProgressProvider
            valueStart={0}
            valueEnd={probabilityOfSuccess}
            duration={0}
            easingFunction={easeQuadInOut}
        >
        {value => {
            const roundedValue = Math.round(value);
            return (
                <CircularProgressbarWithChildren value={value}
                >
                    <div style={{ fontSize: 16, marginTop: -5, textAlign: "center" }}>
                        <p>{translatedText}</p>
                        <h1 id="probability">{`${roundedValue}%`}</h1>
                    </div>
                </CircularProgressbarWithChildren>
            );
        }}
        </AnimatedProgressProvider>
    );
}

export function generate(selectedNumbers, selectedStars, isClicked, setIsClickedAction, setSelectedNumbers, setSelectedStars, setProbabilityOfSuccess, translatedText) {
    let selectedBalls = [];
    for (let i = 0; i < selectedNumbers.length; i++) {
        selectedBalls.push({
            "number": selectedNumbers[i], 
            "type": "NUMBER"}
        );
    }
    for (let i = 0; i < selectedStars.length; i++) {
        selectedBalls.push({
            "number": selectedStars[i], 
            "type": "STAR"}
        );
    }

    axios.post("http://localhost:8080/smart-pick/draw?nbOfNumbers=5&nbOfStars=2", selectedBalls)
        .then(response => {
            let generatedNumbers = [];
            let generatedStars = [];
            for (let i = 0; i < response.data.balls.length; i++) {
                if (response.data.balls[i].type === "NUMBER") {
                    generatedNumbers.push(response.data.balls[i].number);
                } else {
                    generatedStars.push(response.data.balls[i].number);
                }
            }
            setIsClickedAction(isClicked ? true : false);
            setSelectedNumbers(generatedNumbers);
            setSelectedStars(generatedStars);
            setProbabilityOfSuccess(response.data.probability);
        })
        .catch(error => {
            alert(translatedText);
    });
}