import React, {Component} from 'react';
import {connect} from 'react-redux';
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import {Redirect, Link} from 'react-router-dom';
import {setNav} from '../actions/shared';
import {Container, Row, Tab, Nav} from 'react-bootstrap';
import { FaSmile } from "react-icons/fa";


class Home extends Component{
    constructor(props){
        super(props);
        // setting up the navigation bar 
        if(!this.props.nav){
            this.props.dispatch(setNav(true));
        }
    }
    
    render(){
        const {activeUser, answeredQuestions, unAnsweredQuestions, uthedFound} = this.props;

        // this will redirect to the main app if the authedUser is undefined
        // the uathed user will be undefined if you change the url manually and click the back
        // button on the browser
        // if(!uthedFound){
        //     return <Redirect to={`/`}/>
        // }

        const firstNameEnd = activeUser.name.indexOf(' ');
        const firstName = activeUser.name.slice(0, firstNameEnd);

        return(
            <Container>
                {/* changing the text when the user finishes all questions */}
                {unAnsweredQuestions.length
                    ?<Row style={{ flexDirection:'column', margin: '5% 0'}}>
                    <h3>Hello {firstName}, it's time to answer some fun questions ... <FaSmile color='#e6e600'/></h3>
                    <h5>Check out the unanswered list below:</h5>
                    </Row>
                    :<Row style={{ flexDirection:'column', margin: '5% 0'}}>
                    <h3>Great, you've answered all questions for this day...</h3>
                    <h5>You can check your answers in the "Answered Questions" tab and see how other friends answered.</h5>
                    <h5>or you can <Link to={`/add`}>make your own awesome questions</Link>.</h5>
                    </Row>
                }
                <Tab.Container defaultActiveKey="unAnsweredQuestions">
                        <Nav fill variant="tabs" >
                            <Nav.Item>
                                <Nav.Link eventKey="unAnsweredQuestions">Unanswered Questions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="answeredQuestions">Answered Questions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                <Row className="justify-content-md-center">
                    <Tab.Content>
                            <Tab.Pane eventKey="unAnsweredQuestions">
                                <ul>
                                    {unAnsweredQuestions.map((q) => (
                                        <li key={q}>
                                            <UnAnsweredQuestions id={q}/>
                                        </li>
                                    ))}
                                </ul>  
                            </Tab.Pane>

                            <Tab.Pane eventKey="answeredQuestions">
                                <ul>
                                    {answeredQuestions.map((q) => (
                                        <li key={q}>
                                            <AnsweredQuestions id={q}/>
                                        </li>
                                    ))}
                                </ul>
                            </Tab.Pane>
                    </Tab.Content>
                </Row>
                </Tab.Container>
            </Container>
        )
    }
}

function mapStateToProps({users, questions, authedUser}){

    if(authedUser){
        // this will return an object with answered questions sorted based on the question created timestamp
        // and the unanswered questions sorted based on the answered timestamp
        const questionsId = Object.keys(questions);
        const activeUser = users[authedUser];
        return{
            activeUser,
            answeredQuestions : Object.keys(activeUser.answers)
            .sort((a,b) => activeUser.answers[b].timestamp - activeUser.answers[a].timestamp),
            unAnsweredQuestions : questionsId
            .filter((id) => !activeUser.answers[id])
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
            uthedFound: true,
        }

    }else{ 
        return{
            uthedFound: false
        }
    }

}

export default connect(mapStateToProps)(Home);