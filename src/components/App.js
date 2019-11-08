import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import Login from './Login';
import Home from './Home';
import Nav from './Nav';
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
        const {authedUser} = this.props;
        return(
            <div>
                <Router>
                <LoadingBar/>
                    <Container >
                        <Row>
                        {this.props.nav
                        ? <Nav/>
                        :null
                        }
                        </Row>
                        <Row>
                            <Col>
                                {!authedUser
                                ?
                                <Route path='/' exact component={Login}/>
                                :
                                <div>
                                    <Route path='/' exact component={Login}/>
                                    <Route path='/home' exact component={Home}/>
                                    <Route path='/add' exact component={NewQuestion}/>
                                    <Route path='/leaderBoard' exact component={LeaderBoard}/>
                                    <Route path='/questions/:id' exact component={QuestionPage}/>
                                </div>
                                }
                            </Col>
                        </Row>
                    </Container>
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