import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleNewQuestion} from '../actions/questions';
import {Redirect} from 'react-router-dom';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

class NewQuestion extends Component{
    state = {
        optionOne : '',
        optionTwo : '',
        toHome : false,
    }

    handleSubmit(e){
        e.preventDefault()
        const optionOneText = this.state.optionOne;
        const optionTwoText = this.state.optionTwo;
        return this.props.dispatch(handleNewQuestion(
            { 
              optionOneText,
              optionTwoText, 
              author : this.props.authedUser, 
            },
            () => {
                this.setState(()=>({
                    optionOne : '',
                    optionTwo : '',
                    toHome:true,
                }))    
            }
        ))

    }

    handleOptionOne(e){
        const value = e.target.value;
        this.setState(()=>({
            optionOne: value,
        }))
    }
    handleOptionTwo(e){
        const value= e.target.value;
        this.setState(()=>({
            optionTwo: value,
        }))
    }

    render(){
        const {optionOne, optionTwo, toHome} = this.state;
        if(toHome){
            return <Redirect to={`/${this.props.authedUser}/home`}/>
         }
        return(
            <Container style={{textAlign:'center'}}>
                <Card style={{ width: '60rem'}}>
                    <Card.Title style={{textAlign:'center'}}>
                        <h2>Create a new question </h2>
                    </Card.Title>
                    <Card.Text>
                        <p style={{padding: '0 1rem'}}>Complete the question:</p>
                        <h4 style={{padding: '0 1rem'}}>Would you rather ...</h4>
                        
                        <form>
                        <Row>
                        <Col style={{padding: '0 2rem'}}>
                            <input 
                            type='text' 
                            value={optionOne}
                            placeholder='Enter option one text here'
                            style={{width : '80%', border : optionOne? '1px solid black': '1px solid red'}}
                            onChange={(e) => this.handleOptionOne(e)}/>
                            <p style={{padding: '0 2rem'}}>OR</p>
                            <input 
                            type='text' 
                            value={optionTwo}
                            placeholder='Enter option two text here'
                            style={{width : '80%',  border : optionTwo? '1px solid black': '1px solid red'}}
                            onChange={(e) => this.handleOptionTwo(e)}/>
                        </Col>
                        <Col style={{textAlign:'center'}}>
                            <Button variant="secondary" 
                            disabled={!(optionOne && optionTwo)} 
                            onClick={(e) => this.handleSubmit(e)}
                            >Submit</Button>
                        </Col>
                        </Row>
                        </form>
                    </Card.Text>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion);