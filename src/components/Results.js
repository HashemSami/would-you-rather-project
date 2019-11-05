import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import NoMatch from './NoMatch';
import {Row, ProgressBar} from 'react-bootstrap';

class Results extends Component{
    state ={
        toHome: false,
    }

    toHome(){
        this.setState(()=>({
            toHome:true,
        })) 
    }
    

    render(){
        if(this.props.noMatch){
            return <NoMatch/>
        }
        
        if(this.state.toHome){
            return <Redirect to={`/${this.props.authedUser}/home`}/>
        }

        
        const {question, questionUser, authedUser} = this.props
        const {name, avatarURL} = questionUser;
        const {optionOne, optionTwo} = question;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const persentageOne = Math.floor(optionOne.votes.length / totalVotes * 100);
        const persentageTwo = Math.floor(optionTwo.votes.length / totalVotes * 100);

        return(
            <div style={{width: '40rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px', textAlign:'center'}}>
                <div>
                    <h4>Asked by {name}:</h4>
                    <Avatar 
                    className = 'avatar'
                    avatar = {avatarURL}
                    name = {name}/>
                </div>
                <div style={{flexDirection:'column'}}>
                    <span style={{fontSize: '1.5em'}}>Results:</span>
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
                    <Row className="justify-content-md-center">
                            <Button variant="secondary" onClick={(e) => this.toHome(e)}>Back to Home</Button>
                    </Row>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props){
    if(questions[props.match.params.id]){
        const {id} = props.match.params;
        const question = questions[id];
        return{
            question,
            questionUser : users[question['author']],
            authedUser,
            noMatch:false
        }
    }else{
        return{
            noMatch:true
        }
    }
    
}

export default connect(mapStateToProps)(Results);