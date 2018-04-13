import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutingButtons from 'components/RoutingButtons/index';
import Body from 'components/Body/index';

const styles = require('./styles.css');

export default function App() {
  return (
    <Router>
      <div className={styles.app}>
        <RoutingButtons />
        <Body />
      </div>
    </Router>
  );
}