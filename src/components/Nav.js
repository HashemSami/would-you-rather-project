import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import Avatar from './Avatar';
import {setNav} from '../actions/shared';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Nav extends Component{
    state = {
        toHome: false
    }

    logOut(){
        this.setState(({
            toHome : true
        }))
        console.log(this.state.toHome)
    }
    
    render(){
        const {user, authedUser} = this.props;

        if(this.state.toHome){
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
                                    <NavLink to={`/${authedUser}/add`} exact activeClassName='active'>
                                        New Question
                                    </NavLink>
                                </li>
                            </Col>
                            <Col>
                                <li>
                                    <NavLink to={`/${authedUser}/leaderBoard`} exact activeClassName='active'>
                                        Leader Board
                                    </NavLink>
                                </li>
                            </Col>
                            <Col></Col>
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
                            <span>Hello, {user.name}</span>
                        </li>
                    </Col>
                    <Col>
                        <li>
                            <Avatar
                            className='avatar'
                            name={user.name}
                            avatar={user.avatarURL}/>
                        </li>
                    </Col>
                    <Col>
                        <li>
                            <NavLink to={`/`} exact activeClassName='active' onClick={()=>this.props.dispatch(setNav(false))}>
                                    Logout
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

function mapStateToProps({users, nav, authedUser}){
    const user = users[authedUser];
    return{
        user,
        authedUser,
        nav,
    }
}

export default connect(mapStateToProps)(Nav);