import * as React from 'react';
import { Router, Route, browserHistory, withRouter } from 'react-router';
import PicPair from 'components/PicsPair';
import Registration from 'components/Registration';

const styles = require('./styles.css') 

export default function Body() {
  return (
    <div className={styles.body}>
      <Route exact path="/" component={PicPair} />
      <Route path="/register" component={Registration} />
    </div>
  );
}

