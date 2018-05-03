import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { updateCurrentUserInput, postUser } from '../../state/comparison/actions';
import { User, UserRegInput, State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator, UserRegInputActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  regFormPlaceholder: UserRegInput;
  userInput: UserRegInput;
  error: null | string | Error;
}

interface Actions {
  updateCurrentUserInput: UserRegInputActionCreator;
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


  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.actions.postUser();
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
    return (
      <div className={styles.registration}>
        <h2>Hello there, stranger!</h2>
        <div className={styles.wrapper}>
            <input type="text" 
              placeholder={this.props.data.regFormPlaceholder.login} 
              onChange={(e) => {this.handleChange(e, "login")}} /> 
              <div className={
                this.props.data.error !== null && this.props.data.error.toString().indexOf("login") != -1 ? styles.errLog : styles.errLogHidden
                }> {this.props.data.error} 
              </div>
            <input type="email" 
              placeholder={this.props.data.regFormPlaceholder.eMail}
              onChange={(e) => {this.handleChange(e, "email")}}/> 
              <div className={
                this.props.data.error !== null && this.props.data.error.toString().indexOf("email") != -1 ? styles.errEmail : styles.errEmailHidden
                }> {this.props.data.error} 
              </div>
            <input type="password" 
              placeholder={this.props.data.regFormPlaceholder.password}
              onChange={(e) => {this.handleChange(e, "password")}}/>
            <input type="password" 
              placeholder={this.props.data.regFormPlaceholder.confirmedPassword}
              onKeyPress={(e) => this.handleEnter(e)}
              onChange={(e) => {this.handleChange(e, "confirmedPassword")}}/>
              <div className={
                this.props.data.error !== null && this.props.data.error.toString().indexOf("password missmatch") != -1 ? styles.errPwd : styles.errPwdHidden
                }> {this.props.data.error} 
              </div>
            <br/>
            <Button size="large" color="success" hollow onClick={this.handleClick}>Register</Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  regFormPlaceholder: state.comparison.regFormPlaceholder,
  userInput: state.comparison.userRegInput,
  error: state.comparison.error
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

