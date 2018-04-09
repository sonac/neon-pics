import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { postComparison, nextTwo } from '../../state/comparison/actions';
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

class RoutingButtons extends Component<Props, State> {
  sendClicked = () => {
    console.log("click");
  }

  render() {
    return (
      <div className={styles.routingButtons}>
        <Button style={{styles}} color="success" size="large" hollow onClick={this.sendClicked}>Home</Button>
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RoutingButtons);

