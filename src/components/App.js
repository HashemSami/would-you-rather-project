import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
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
        // loading data when app starts
        const {dispatch, authedUser} = this.props;
        if(!authedUser){
            dispatch(handleInitialData());
        }
    }

    render(){
        const {questions, authedUser} = this.props;
        return(
            <div>
                <LoadingBar/>
                {questions
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
                        {/* switching on different routes for each URL */}
                            <Switch>
                                <Route path='/' exact component={Login}/>
                                
                                {authedUser
                                ?
                                <div>
                                    <Route path='/:authedUser/home' component={Home}/>
                                    <Route path='/404' component={NoMatch}/>
                                    <Route path='/add' component={NewQuestion}/>
                                    <Route path='/leaderBoard' component={LeaderBoard}/>
                                    <Route path='/questions/:id' component={QuestionPage}/>
                                </div>
                                : <Redirect to={`/`}/>
                                 }
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                :null}
            </div>
        )
    }
};

function mapStateToProps({questions, authedUser, nav, loadingBar}){
    return {
        questions,
        authedUser,
        nav,
        loadingBar,
    }
}

export default withRouter(connect(mapStateToProps)(App));