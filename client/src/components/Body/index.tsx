import * as React from 'react';
import { Router, Route, browserHistory, withRouter } from 'react-router';
import PicPair from 'components/PicsPair';
import Registration from 'components/Registration';
import NewQuestionnaire from 'components/NewQuestionnaire';

const styles = require('./styles.css') 

export default function Body() {
  return (
    <div className={styles.body}>
      <Route exact path="/" component={PicPair} />
      <Route path="/register" component={Registration} />
      <Route path="/comparison" component={NewQuestionnaire} />
    </div>
  );
}

