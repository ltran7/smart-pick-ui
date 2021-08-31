import React, {useState, useEffect} from 'react';
import Grid from '../components/GridComponent';
import { useTranslation } from 'react-i18next';
import { sortSelection, computeProbability, generate } from '../scripts/SmartPick';

function SmartPick(props) {

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);
    const [probabilityOfSuccess, setProbabilityOfSuccess] = useState(0);
    const [isClickedAction, setIsClickedAction] = useState(false);

    const { t } = useTranslation();

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

    const handleGenerate = (isClicked) => {
        generate(selectedNumbers, selectedStars, isClicked, setIsClickedAction, setSelectedNumbers, setSelectedStars, setProbabilityOfSuccess, t("an_unexpected_error_occurred_while_generating_the_numbers"));
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
                        <Grid numberOfRows={10} numberOfColumns={5} limit={50} selectionLimit={5} selection={selectedNumbers} onSelection={handleNumberSelection} type={"number"}/>
                    </div>
                    <div className="grid-stars">
                        <Grid numberOfRows={3} numberOfColumns={5} limit={12} selectionLimit={2} selection={selectedStars} onSelection={handleStarSelection} type={"star"}/>
                    </div>
                </div>
                <div className="col-sm align-self-center selection-container">
                    <div className="selection-numbers-and-stars">
                        <h5><img src='assets/images/ball.png' height="40" width="40" alt='Selected balls'/><span id="selection-numbers" className="selection numbers">{sortSelection(selectedNumbers)}</span></h5>     
                        <h5><img src='assets/images/star.jpg' height="40" width="40" alt='Selected stars'/><span id="selection-stars" className="selection stars">{sortSelection(selectedStars)}</span></h5> 
                    </div>
                    <button id="generate-button" className="generate-button" onClick={handleGenerate}>{t("generate")}</button>
                    <button id="reset-button" className="reset-button" onClick={handleReset}>{t("reset")}</button>
                </div>
                <div className="col-sm align-self-center probability-container">
                    {computeProbability(probabilityOfSuccess, t("probability_of_success"))}
                </div>
            </div>   
        </div>
    );
}

export default SmartPick;