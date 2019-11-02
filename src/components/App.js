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
        // loading data when app starts
        const {dispatch} = this.props;
        dispatch(handleInitialData());
    }

    render(){
        const {questions} = this.props;
        return(
            <Router>
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
                                <Route path='/:authedUser/home' component={Home}/>
                                <Route path='/:authedUser/add' component={NewQuestion}/>
                                <Route path='/:authedUser/leaderBoard' component={LeaderBoard}/>
                                <Route path='/questions/:id' component={QuestionPage}/>
                                <Route path='/404' component={NoMatch}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                :null}
            </Router>
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

export default connect(mapStateToProps)(App);