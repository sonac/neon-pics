import React, { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
}

interface Actions {
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class AuthButton extends Component<Props, State> {
  sendClicked = () => {
    console.log("click");
  }

  render() {
    return (
      <div className={styles.authButton}>
        <Button color="secondary" size="large" hollow onClick={this.sendClicked}>Register</Button>
      </div>
    )
  }

}

export default (AuthButton);
