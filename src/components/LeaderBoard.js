import React from 'react';
import { connect } from 'react-redux';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import Avatar from './Avatar';

function LeaderBoard(props){

    console.log(props)
    const {info} = props;
    return(
        <div>
                {info.map((user)=>{
                    return(
                        <Container 
                        style={{width: '40rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px'}} >
                            <Row>
                            <Avatar 
                                className = 'avatar'
                                avatar = {user.userAvatar}
                                name = {user.userName}/>

                                <h4>{user.userName}</h4>
                            </Row>
                            <Row >
                                <Col>
                                <Row>
                                <p>Answerd Questions</p>
                                <span>{user.answeredQuestions}</span>
                                </Row>
                                <Row>
                                <p>Created Questions</p>
                                <span>{user.createdQuestions}</span>
                                </Row>
                                </Col>
                                <Col>
                                    <div style={{display: 'flex', flexDirection:'column', textAlign:'center'}}>

                                        <span>Score</span>
                                        <span>{user.answeredQuestions + user.createdQuestions}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    )
                })}
                
            
        </div>
    )
}

function mapStateToProps({users}){
    const usersId = Object.keys(users);
    return{
        info: usersId.map((id) => {
            const user = users[id];
            return {
                userName: user.name,
                userAvatar: user.avatarURL,
                answeredQuestions : Object.keys(user.answers).length,
                createdQuestions: user.questions.length,
            }
        })
        .sort((a,b) => (b.answeredQuestions + b.createdQuestions) - 
                       (a.answeredQuestions + a.createdQuestions))

    }
}

export default connect(mapStateToProps)(LeaderBoard);



// function mapStateToProps ({tweets}){
//     return {tweetsId : Object.keys(tweets)
//         .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
//     }
// }

// export default connect(mapStateToProps)(Dashboard);