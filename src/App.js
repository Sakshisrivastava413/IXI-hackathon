import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import CourseList from './CourseList';
import SubCourseList from './SubCourseList';
import SelfAnalysis from './SelfAnalysis';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="card-list">
          <Route exact path="/courses" component={CourseList} />
          <Route exact path="/sub-courses" component={SubCourseList} />
          <Route exact path="/quiz" component={SelfAnalysis} />
          <Redirect exact from="/" to="/courses" />
        </div>
      </Router>
    </div>
  );
}

export default App;
