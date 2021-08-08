import React, {useState, useEffect} from 'react';
import Grid from './GridComponent';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CircularProgressbarWithChildren }  from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from "./AnimatedProgressProviderComponent";

function SmartPick(props) {

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);
    const [probabilityOfSuccess, setProbabilityOfSuccess] = useState(0);
    const [isClickedAction, setIsClickedAction] = useState(false);

    const { t } = useTranslation();

    const handleGenerate = (isClicked) => {
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
                alert(t("an_unexpected_error_occurred_while_generating_the_numbers"));
        });
    }

    const handleReset = () => {
        setSelectedNumbers([]);
        setSelectedStars([]);
        setIsClickedAction(false);
    };

    const handleNumberSelection = (selection) => {
        setSelectedNumbers(selection);
    };

    const handleStarSelection = (selection) => {
        setSelectedStars(selection);
    };

    useEffect(() => {
        if (!isClickedAction) {
            if (selectedNumbers.length === 5 && selectedStars.length === 2) {
                handleGenerate(false);
            } else {
                setProbabilityOfSuccess(0);
            }
        }
      },[selectedNumbers.length, selectedStars.length, isClickedAction]);

    const createGridOfNumbers = () => {
        return (
            <div>
                <Grid numberOfRows={10} numberOfColumns={5} limit={50} selectionLimit={5} selection={selectedNumbers} onSelection={handleNumberSelection} type="number"/>
            </div>
        );
    }
    const createGridOfStars = () => {
        return (
            <div>
                <Grid numberOfRows={3} numberOfColumns={5} limit={12} selectionLimit={2} selection={selectedStars} onSelection={handleStarSelection} type="star"/>
            </div>    
        );
    }

    const displaySelection = (selection) => {
        if (selection.length >= 1) {
            return selection
            .sort((a, b) => a > b ? 1 : -1)
            .map(t => <span>{t}</span>)
            .reduce((previous, current) => [previous, ' - ', current])
        }
    }

    const displayProbability = () => {
        //if (generated) {
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
                            //text={`${roundedValue}%`}
                            /* This is important to include, because if you're fully managing the
                            animation yourself, you'll want to disable the CSS animation. */
                            //styles={buildStyles({ pathTransition: "none" })}
                        >
                            <div style={{ fontSize: 16, marginTop: -5, textAlign: "center" }}>
                                <p>{t("probability_of_success")}</p>
                                <h1 id="probability">{`${roundedValue}%`}</h1>
                            </div>
                        </CircularProgressbarWithChildren>
                    );
                }}
                </AnimatedProgressProvider>
            );
        //}
    }

    return (
        <div className="container">
            <div className="row">
                <span className="fa fa-list-ol fa-2x float-left ml-2 mr-2"/><h3>{t("smart_pick")}</h3>
                    <div className="col-12">   
                        <hr/>
                    </div>
            </div>
            <div className="row row-content">
                <div className="col-sm grid-container">                      
                    <div className="grid-numbers">
                        {createGridOfNumbers()}
                    </div>
                    <div className="grid-stars">
                        {createGridOfStars()}
                    </div>
                </div>
                <div className="col-sm align-self-center selection-container">
                    <div className="selection-numbers-and-stars">
                        <h5><img src='assets/images/ball.png' height="40" width="40" alt='Selected balls'/><span id="selection-numbers" className="selection">{displaySelection(selectedNumbers)}</span></h5>     
                        <h5><img src='assets/images/star.jpg' height="40" width="40" alt='Selected stars'/><span id="selection-stars" className="selection">{displaySelection(selectedStars)}</span></h5> 
                    </div>
                    <button id="generate-button" className="generate-button" onClick={handleGenerate}>{t("generate")}</button>
                    <button id="reset-button" className="reset-button" onClick={handleReset}>{t("reset")}</button>
                </div>
                <div className="col-sm align-self-center probability-container">
                    {displayProbability()}
                </div>
            </div>   
        </div>
    );
}

export default SmartPick;