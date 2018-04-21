import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import RoutingButtons from 'components/RoutingButtons/index';
import Body from 'components/Body/index';
import { checkToken } from '../../state/comparison/actions';
import { BasicActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
}

interface Actions {
  checkToken: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class App extends Component<Props, State> {

  componentDidMount() {
    this.props.actions.checkToken();
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <RoutingButtons />
          <Body />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  checkToken
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);