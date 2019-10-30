import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import Login from './Login';
import Home from './Home';
import Nav from './Nav';
import NoMatch from './NoMatch';
import {Container, Row, Col} from 'react-bootstrap';
import QuestionPage from './QuestionPage';

class App extends Component{

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(handleInitialData());
    }

    render(){
        const {users} = this.props;
        return(
            <Router>
                <LoadingBar/>
                {users
                ?
                <Container >
                    <Row>
                    {this.props.nav
                    ? <Nav/>
                    :null
                    }
                    </Row>
                    <Row>
                        <Col>
                            <Switch>
                                <Route path='/' exact component={Login}/>
                                <Route path='/:authedUser/home' component={Home}/>
                                <Route path='/:authedUser/add' component={NewQuestion}/>
                                <Route path='/:authedUser/leaderBoard' component={LeaderBoard}/>
                                <Route path='/:id' component={QuestionPage}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                :null}
            </Router>
        )
    }
};

function mapStateToProps({users, authedUser, nav, loadingBar}){
    return {
        users,
        authedUser,
        nav,
        loadingBar,
    }
}

export default connect(mapStateToProps)(App);