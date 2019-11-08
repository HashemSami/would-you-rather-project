import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

class UnAnsweredQuestions extends Component{

    toQuestionPage(e, id){
        this.props.history.push(`/questions/${id}`);
    }
    
    render(){
        const {question, questionUser} = this.props
        const {name, avatarURL} =questionUser;
        const {id, optionOne} = question;
        return(
            <div  style={{width: '40rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px', textAlign:'center'}}>
                    <div>
                        <Avatar 
                        className = 'avatar'
                        avatar = {avatarURL}
                        name = {name}/>
                        <h4>{name} asks:</h4>
                    </div>
                <div style={{flexDirection:'column'}}>
                  <span style={{fontSize: '1.5em'}}>Would you rather</span>
                  <p>...{optionOne.text}...</p>
                    <Button variant="outline-success" onClick={(e)=>this.toQuestionPage(e,id)} >View Poll</Button>
                  </div>
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

export default withRouter(connect(mapStateToProps)(UnAnsweredQuestions));