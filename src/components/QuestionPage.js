import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import NoMatch from './NoMatch';
import Results from './Results';
import {handleSaveAnswer} from '../actions/questions';
import {Redirect} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

class QuestionPage extends Component{
    state ={
        answer:'',
        toHome: false,
    }

    handleAnswer(e){
        const {question, authedUser} = this.props;
        const answer = this.state.answer === question.optionOne.text? "optionOne":"optionTwo"; 
        this.props.dispatch(handleSaveAnswer({
            authedUser: authedUser, 
            qid : question.id, 
            answer : answer,
            time : Date.now()
        }))
    
        this.setState(()=>({
            toHome:true,
        }))
    }

    setAnswer(e){
        
        const answer = e.target.innerHTML;
        this.setState(()=>({
            answer,
        }))
        
    }

    render(){

        if(this.props.noMatch){
            return <NoMatch/>
        }

        const {question, user, answered} = this.props;
        const {optionOne, optionTwo} = question;

        // will redirect to home when asnwered is submitted
        if(this.state.toHome){
            return <Redirect to={`/home`}/>
        }

        return(
            <div>
                {answered?
                <Results id={question.id}/>
                :
                <div style={{width: '40rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px', textAlign:'center'}}>
                        <Row style={{justifyContent: 'flex-start'}}>
                            <Col sm={2}>
                            <Avatar 
                            className = 'avatar'
                            avatar = {user.avatarURL}
                            name = {user.name}/>
                            </Col>
                            <Col sm={8}>
                            <h4>{user.name} asks:</h4>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={4}>
                            <h5 style={{textAlign:'center'}}>Would you rather:</h5>
                            </Col>
                            <Col sm={8} className= 'center'>
                            <Button variant="outline-success" onClick={(e) => this.setAnswer(e)}>{optionOne.text}</Button>
                            <p style={{textAlign:'center'}}>OR</p>
                            <Button variant="outline-success" onClick={(e) => this.setAnswer(e)}>{optionTwo.text}</Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Button variant="secondary" disabled={!this.state.answer} onClick={(e) => this.handleAnswer(e)}>submit</Button>
                        </Row>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props){
        // getting the id from URL
        if(questions[props.match.params.id]){
            const {id} = props.match.params;
            const question = questions[id];
            const user = users[question.author];
            const AUser = users[authedUser];
        
            return{
                id,
                question,
                user,
                authedUser,
                answered: AUser.answers[id]? true:false,
                noMatch:false
            }
        }else{
            return{
                noMatch:true
            }
            
        }
}

export default connect(mapStateToProps)(QuestionPage);