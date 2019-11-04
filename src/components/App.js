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
                            <Route path='/'  exact component={Login}/>
                            {<Login/>
                            ?
                            <div>
                                <Route path='/:authedUser/home' component={Home}/>
                                <Route path='/add' component={NewQuestion}/>
                                <Route path='/leaderBoard' component={LeaderBoard}/>
                                <Route path='/questions/:id' component={QuestionPage}/>
                            </div>
                            : <Login/>
                            }
                        </Col>
                    </Row>
                </Container>
                :null}
                </Router>
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

export default connect(mapStateToProps)(App);