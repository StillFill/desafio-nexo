import React from 'react';
import UserChoose from '../../Components/Play/UserChoose/UserChoose';
import DisplayChoose from '../../Components/Play/DisplayChoose/DisplayChoose'
import { calculatePaperChoise, calculateRockChoise, calculateScissorsChoise } from '../../Services/Choises';

export default class Play extends React.Component {

    selectOptions = ['paper', 'rock', 'scissors']
    initialState = {
        userHandSelected: "",
        computerHandSelected: "",
        result: null
    };

    constructor(props){
        super(props);

        this.state = this.initialState;
    }

    generateComputerChoise = () => {
        const randomChoise = Math.floor(Math.random() * 3) + 1;
        this.setState({ computerHandSelected: this.selectOptions[randomChoise - 1] });
    }

    onUserChoose = (userHandSelected) => {
        this.setState({ userHandSelected });

        setTimeout(() => {
            this.generateComputerChoise();

            const result = this.calculateResult();

            this.setState({ result }, () => {
                this.props.onResult(result);
            });
        }, 1000);
    }

    calculateResult = () => {

        const { userHandSelected, computerHandSelected } = this.state;

        if (!userHandSelected || !computerHandSelected) return;

        switch(userHandSelected) {
            case "rock":
                return calculateRockChoise(computerHandSelected);
            case "paper":
                return calculatePaperChoise(computerHandSelected);
            case "scissors":
                return calculateScissorsChoise(computerHandSelected);
        }
    }

    resetChoises = () => {
        this.setState(this.initialState);
    }

    render() {

        const { userHandSelected, computerHandSelected, result } = this.state;

        if (!userHandSelected) {
            return <UserChoose onUserChoose={this.onUserChoose} />
        }

        return (
            <DisplayChoose
                userHandSelected={userHandSelected}
                computerHandSelected={computerHandSelected}
                resetChoises={this.resetChoises}
                result={result} // 'win', 'lose', 'draw'
            />
        )
    }
}