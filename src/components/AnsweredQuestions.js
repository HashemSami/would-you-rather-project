import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import {ProgressBar, Card} from 'react-bootstrap';

class AnsweredQuestions extends Component{
    render(){
        const {question, questionUser, authedUser} = this.props
        const {name, avatarURL} = questionUser;
        const {optionOne, optionTwo} = question;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const persentageOne = Math.floor(optionOne.votes.length / totalVotes * 100);
        const persentageTwo = Math.floor(optionTwo.votes.length / totalVotes * 100);

        return(
            <div>
                <Card style={{ width: '30rem', textAlign:'center'}}>
                <Card.Title>
                <h4>Asked by {name}:</h4>
                    <Avatar 
                    className = 'avatar'
                    avatar = {avatarURL}
                    name = {name}/>
                </Card.Title>
                <Card.Text style={{flexDirection:'column'}}>
                    <h5>Results:</h5>
                    <div style={{color :optionOne.votes.includes(authedUser)? "red": "black"}}>
                        <p>Would you rather {optionOne.text}</p>
                        <ProgressBar 
                        now={persentageOne} 
                        label={`${persentageOne}%`} 
                        style={{width: '50%', margin:'auto'}}/>
                        <p>{optionOne.votes.length} out of {totalVotes} votes</p>
                    </div>
                    <div style={{color : optionTwo.votes.includes(authedUser)? "red": "black"}}>
                        <p>Would you rather {optionTwo.text}</p>
                        <ProgressBar 
                        now={persentageTwo} 
                        label={`${persentageTwo}%`} 
                        style={{width: '50%', margin:'auto'}}/>
                        <p>{optionTwo.votes.length} out of {totalVotes} votes</p>
                    </div>
                </Card.Text>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, {id}){
    const question = questions[id];
    return{
        question,
        questionUser : users[question['author']],
        authedUser,
    }
}

export default connect(mapStateToProps)(AnsweredQuestions);