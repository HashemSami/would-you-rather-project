import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setNav} from '../actions/shared';
import {handleSetAuthedUser} from '../actions/authedUser';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Avatar from './Avatar';
import {Container, Row} from 'react-bootstrap';

class Login extends Component{
    state = {
        activeUser: {
            id: '',
            name: '',
            avatar: '',
        },
    }
    constructor(props){
        super(props);
        if(this.props.nav){
            this.props.dispatch(setNav(false));
        }
    }

    selectUser(id, name, avatarURL){
        this.setState(({
            activeUser: {
                id: id? id:'',
                name,
                avatar: avatarURL
            }
        }))
        console.log(this.state.activeUser)       
    }

    setAuthedUser(e){
        return this.props.dispatch(handleSetAuthedUser(this.state.activeUser.id));
    }

    render(){
        const {usersArray, authedUser} = this.props;
        const {id, name, avatar} = this.state.activeUser;

        return(
            <Container className="center">
                <Row>
                        <h1 style={{margin:'5rem auto'}}>Would you rather?!</h1>
                </Row>
                {avatar
                ? <div >
                <Avatar
                className='avatar'
                name={name}
                avatar={avatar}/>
                    <h3>{name}</h3>
                    </div>
                : <h3>Please select a user</h3> 
                }               
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select user
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {usersArray.map((user) =>(
                            <Dropdown.Item key={user.id} className='user' onClick={() => this.selectUser(user.id, user.name, user.avatarURL)}>
                                <Avatar
                                className='avatar'
                                name={user.name}
                                avatar={user.avatarURL}/>
                                <h4>{user.id}</h4>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Link to={`/${id}/home`} onClick={(e)=>this.setAuthedUser(e)}>
                <Button 
                variant="secondary" 
                disabled={!this.state.activeUser.id}
                >Sign In</Button>
                </Link>   
            </Container>                            
        )
        }
};

function mapStateToProps({users, nav, authedUser}){
    const usersArray = Object.values(users)
    return {
        usersArray,
        authedUser,
        nav,
    }
}

export default connect(mapStateToProps)(Login);