import * as React from 'react';
import { Router, Route, browserHistory, withRouter } from 'react-router';
import PicPair from 'components/PicsPair';
import Registration from 'components/Registration';
import NewQuestionnaire from 'components/NewQuestionnaire';
import AllQuests from 'components/AllQuests';
import AnsweredQuestions from 'components/AnsweredQuestions';
import Answer from 'components/Answer';

const styles = require('./styles.css') 

export default function Body() {
  return (
    <div className={styles.body}>
      <Route exact path="/" component={AllQuests} />
      <Route path="/register" component={Registration} />
      <Route path="/comparison" component={NewQuestionnaire} />
      <Route path="/questionnaire" component={PicPair} />
      <Route path="/results" component={AnsweredQuestions} />
      <Route path="/answer" component={Answer} />
    </div>
  );
}

