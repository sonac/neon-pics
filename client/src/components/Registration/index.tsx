import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
}

interface Actions {
}

interface Props {
}

type State = {}

class Registration extends Component<Props, State> {

  render() {
    return (
      <div className={styles.registration}>
        <h2>Oh hi, Mark!</h2>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
});

const mapDispatchToProps: Actions = {
};

const mergeProps = (data: Data, actions: Actions): Props => ({
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Registration);

