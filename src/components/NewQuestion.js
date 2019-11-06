import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleNewQuestion} from '../actions/questions';
import {Redirect} from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap';

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
            // a function to empty the text input when finished handling the submit
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

        // redirect to home when new question submitted
        if(toHome){
            return <Redirect to={`/home`}/>
        }

        return(
            <div style={{width: '50rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px', textAlign:'center'}}>
                <div style={{textAlign:'center'}}>
                    <h2>Create a new question </h2>
                </div>
                <div>
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
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion);