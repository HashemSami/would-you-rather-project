import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import NoMatch from './NoMatch';
import {handleSaveAnswer} from '../actions/questions';
import {Redirect} from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap';

class QuestionPage extends Component{
    state ={
        answer:'',
        toHome: false,
        noMatch: this.props.noMatch,
    }

    handleAnswer(e){
        console.log(this.state.answer)
        const {question, authedUser} = this.props;
        const answer = this.state.answer === question.optionOne.text? "optionOne":"optionTwo"; 
        console.log(authedUser)
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
        console.log(this.props)
        // will redirect to the "not found" page when the question id doesn't match with the data.
        if(this.state.noMatch){
            return <NoMatch/>
        }

        const {question, user} = this.props;
        const {optionOne, optionTwo} = question;

        // will redirect to home when asnwered is submitted
        if(this.state.toHome){
            return <Redirect to={`/${this.props.authedUser}/home`}/>
        }

        return(
            <div>
                <Container>
                <Row className="justify-content-md-center">
                    <Card style={{ width: '40rem'}}>
                        <Card.Body>  
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
                                <Button variant="secondary" onClick={(e) => this.handleAnswer(e)}>submit</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, props){

    console.log(props.match.params)
    
    if(questions[props.match.params.id]){
        // getting the id from URL
        const {id} = props.match.params;
        const question = questions[id];
        const user = users[question.author];
    
        return{
            question,
            user,
            authedUser,
            noMatch: authedUser? false:true,
        }
    }else {
        return {
            noMatch: true,
            authedUser, 
        }
    }
}

export default connect(mapStateToProps)(QuestionPage);