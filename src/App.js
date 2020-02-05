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
import PersonalisedContent from './PersonalisedContent';
import CourseIntro from './CourseIntro';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/courses" component={CourseList} />
        <Route exact path="/sub-courses" component={SubCourseList} />
        <Route exact path="/course-intro" component={CourseIntro} />
        <Route exact path="/quiz" component={SelfAnalysis} />
        <Route exact path="/personalised-content" component={PersonalisedContent} />
        {/* <Redirect exact from="/" to="/courses" /> */}
      </Router>
    </div>
  );
}

export default App;
