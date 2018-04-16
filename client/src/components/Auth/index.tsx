import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { updateCurrentUserInput, login } from '../../state/comparison/actions';
import { User, UserRegInput, State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator, UserRegInputActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  regFormPlaceholder: UserRegInput;
  userInput: UserRegInput;
}

interface Actions {
  updateCurrentUserInput: UserRegInputActionCreator;
  login: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class Auth extends Component<Props, State> {

  handleClick = () => {
    this.props.actions.login();
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('heres enter')
    }
  }

  handleChange = (e, inp) => {
    let userInp = this.props.data.userInput
    if (inp === "login") { userInp = {...userInp, login: e.target.value} }
    else if (inp === "email") { userInp = {...userInp, eMail: e.target.value} }
    else if (inp === "password") { userInp = {...userInp, password: e.target.value} }
    else if (inp === "confirmedPassword") { userInp = {...userInp, confirmedPassword: e.target.value} }
    this.props.actions.updateCurrentUserInput(userInp)
  }

  render() {
    console.log(this.props.data.userInput)
    return (
      <div className={styles.login}>
        <h2>Login window</h2>
        <div className={styles.inputWrapper}>
            <input type="text" 
              placeholder={this.props.data.regFormPlaceholder.login} 
              onChange={(e) => {this.handleChange(e, "login")}} />
            <input type="password" 
              placeholder={this.props.data.regFormPlaceholder.password}
              onKeyPress={(e) => this.handleEnter(e)}
              onChange={(e) => {this.handleChange(e, "password")}}/>
            <br/>
            <Button size="large" color="success" hollow onClick={this.handleClick}>Login</Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  regFormPlaceholder: state.comparison.regFormPlaceholder,
  userInput: state.comparison.userRegInput
});

const mapDispatchToProps = {
  updateCurrentUserInput,
  login
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Auth);

