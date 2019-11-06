import React from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Avatar from './Avatar';
import {IoIosStar} from "react-icons/io";

function LeaderBoard(props){

    const {info} = props;

    info[0]= {
        ...info[0],
        starColor: 'gold',
    }
    info[1]={
        ...info[1],
        starColor: 'silver',
    }
    info[2] = {
        ...info[2],
        starColor: '#cd7f32',
    }

    return(
        <ul>
            {info.map((user)=>{

                return(
                    <li 
                    key={user.id}
                    style={{width: '40rem', border: '2px solid grey', padding:'2rem', margin: '2rem auto', borderRadius: '15px'}} 
                    >
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

                                    <span>Score </span>
                                    <span><IoIosStar color={user.starColor? user.starColor: ''}/></span>
                                    <span>{user.answeredQuestions + user.createdQuestions}</span>
                                    
                                </div>
                            </Col>
                        </Row>
                    </li>
                )
            })}
        </ul>
    )
}

function mapStateToProps({users}){
    const usersId = Object.keys(users);
    return{
        info: usersId.map((id) => {
            const user = users[id];
            return {
                id: user.id,
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