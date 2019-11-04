import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import Avatar from './Avatar';
import {Container, Row, Col} from 'react-bootstrap';
import {handleSetAuthedUser} from '../actions/authedUser';

class Nav extends Component{
    state = {
        toApp: false
    }

    // setting up the logout link
    logOut(){
        this.setState(({
            toApp : true
        }))
    }
    
    render(){
        const {user, authedUser} = this.props;

        // redirect to the main app when logging out
        if(this.state.toApp){
            return <Redirect to={`/`}/>
        }

        return(
            <Container>
                <Row>
                    <Col xs={12} md={8}> 
                        <ul>
                            <Row>
                            <Col>
                                <li>
                                    <NavLink to={`/${authedUser}/home`} exact activeClassName='active'>
                                        Home
                                    </NavLink>
                                </li>
                            </Col>
                            <Col>
                                <li>
                                    <NavLink to={`/add`} exact activeClassName='active'>
                                        New Question
                                    </NavLink>
                                </li>
                            </Col>
                            <Col>
                                <li>
                                    <NavLink to={`/leaderBoard`} exact activeClassName='active'>
                                        Leader Board
                                    </NavLink>
                                </li>
                            </Col>
                            
                            </Row>
                        </ul>
                    </Col>
            {this.props.authedUser
            ?
            <Col xs={6} md={4}>
            <ul >
                <Row>
                    <Col>
                        <li>
                            <span>{user.name}</span>
                            <Avatar
                            className='avatar'
                            name={user.name}
                            avatar={user.avatarURL}/>
                        </li>
                    </Col>
                    <Col>
                        <li>
                            <NavLink to={`/`} exact activeClassName='active' onClick={() => this.props.dispatch(handleSetAuthedUser(''))}>
                                <button className='button'>Logout</button>
                            </NavLink>
                        </li>
                    </Col>
                </Row>
            </ul>
            </Col>
                :null} 
            </Row>    
            </Container>
        )
    }
    
}

function mapStateToProps({users, authedUser}){
    const user = users[authedUser];
    return{
        user,
        authedUser,
    }
}

export default connect(mapStateToProps)(Nav);