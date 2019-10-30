import React, {Component} from 'react';
import {connect} from 'react-redux';
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import {Container, Row, Tab, Nav} from 'react-bootstrap';


class Home extends Component{
    
    render(){
        const {activeUserName, answeredQuestions, unAnsweredQuestions} = this.props;
        console.log(this.props)
        return(
            <Container style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Row>
                <h3>Hello {activeUserName.name}</h3>
                </Row>
                    <Tab.Container defaultActiveKey="unAnsweredQuestions">
                            <Nav fill variant="tabs" >
                                <Nav.Item>
                                    <Nav.Link eventKey="unAnsweredQuestions">Ananswered Questions</Nav.Link>
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

    const questionsId = Object.keys(questions);
    const activeUser = users[authedUser];
    return{
        activeUserName: activeUser,
        answeredQuestions : Object.keys(activeUser.answers)
        .sort((a,b) => activeUser.answers[b].timestamp - activeUser.answers[a].timestamp),
        unAnsweredQuestions : questionsId
        .filter((id) => !activeUser.answers[id])
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    }

}

export default connect(mapStateToProps)(Home);