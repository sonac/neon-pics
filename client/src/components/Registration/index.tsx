import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { updateCurrentUserInput, postUser } from '../../state/comparison/actions';
import { User, UserInput, State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator, UserInputActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  currentUser: User;
  userInput: UserInput;
}

interface Actions {
  updateCurrentUserInput: UserInputActionCreator;
  postUser: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class Registration extends Component<Props, State> {

  handleClick = () => {
    this.props.actions.postUser();
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
      <div className={styles.registration}>
        <h2>Oh hi, Mark!</h2>
        <div className={styles.wrapper}>
            <input type="text" 
              placeholder={this.props.data.userInput.login} 
              onChange={(e) => {this.handleChange(e, "login")}} />
            <input type="email" 
              placeholder={this.props.data.userInput.eMail}
              onChange={(e) => {this.handleChange(e, "email")}}/>
            <input type="password" 
              placeholder={this.props.data.userInput.password}
              onChange={(e) => {this.handleChange(e, "password")}}/>
            <input type="password" 
              placeholder={this.props.data.userInput.confirmedPassword}
              onChange={(e) => {this.handleChange(e, "confirmedPassword")}}/>
            <br/>
            <input type="submit" value="Register" onClick={this.handleClick} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  currentUser: state.comparison.currentUser,
  userInput: state.comparison.userInput
});

const mapDispatchToProps = {
  updateCurrentUserInput,
  postUser
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Registration);

