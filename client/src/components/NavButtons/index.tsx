import React, { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { postComparison, nextTwo } from '../../state/comparison/actions';
import { State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  currentPicPairIndex: number;
  currentVote: number;
}

interface Actions {
  postComparison: BasicActionCreator;
  nextTwo: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class NavButtons extends Component<Props, State> {
  sendClicked = () => {
    this.props.actions.postComparison();
  }

  render() {
    return (
      <div className={styles.navButtons}>
        <Button color="secondary" size="large" hollow onClick={this.sendClicked}>Send results!</Button>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  currentPicPairIndex: state.comparison.currentPicPairIndex,
  currentVote: state.comparison.currentVote
});

const mapDispatchToProps: Actions = {
  postComparison,
  nextTwo
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavButtons);
