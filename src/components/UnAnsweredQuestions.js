import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import {handleSaveAnswer} from '../actions/questions';
import {Container, Row, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class UnAnsweredQuestions extends Component{
    
    render(){
        const {question, questionUser} = this.props
        const {name, avatarURL} =questionUser;
        const {id, optionOne} = question;
        return(
            <div >
                <Card style={{ width: '30rem', textAlign:'center'}}>
                <Card.Title>
                <div>
                    <Avatar 
                    className = 'avatar'
                    avatar = {avatarURL}
                    name = {name}/>
                </div>
                <h4>{name} asks:</h4>
                </Card.Title>
                <Card.Text style={{flexDirection:'column'}}>
                  <h5>Would you rather</h5>
                  <p>...{optionOne.text}...</p>
                  <Link to={`/${id}`}>
                  <Button variant="outline-success" >View Poll</Button>
                  </Link>
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

export default connect(mapStateToProps)(UnAnsweredQuestions);