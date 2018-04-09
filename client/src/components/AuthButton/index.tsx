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

class AuthButton extends Component<Props, State> {
  sendClicked = () => {
    console.log("click");
  }

  render() {
    return (
      <div className={styles.authButton}>
        <Button style={{styles}} size="large" hollow onClick={this.sendClicked}>Register</Button>
        /
        <Button style={{styles}} size="large" hollow onClick={this.sendClicked}>Login</Button>
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AuthButton);

