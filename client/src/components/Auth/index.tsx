import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { connect } from 'react-redux';
import { values } from 'ramda';
import * as Cookie from 'universal-cookie';
import { updateCurrentLoginInput, login } from '../../state/comparison/actions';
import { User, UserLogInput, State as ComparisonState } from 'state/comparison/types';
import { BasicActionCreator, UserLogInputActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  regFormPlaceholder: UserLogInput;
  loginInput: UserLogInput;
  error: null | string | Error;
}

interface Actions {
  updateCurrentLoginInput: UserLogInputActionCreator;
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
      this.props.actions.login();
    }
  }

  handleChange = (e, inp) => {
    let userInp = this.props.data.loginInput
    if (inp === "login") { userInp = {...userInp, login: e.target.value} }
    else if (inp === "password") { userInp = {...userInp, password: e.target.value} }
    this.props.actions.updateCurrentLoginInput(userInp)
  }

  render() {
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
              <div className={
                this.props.data.error !== null && this.props.data.error.toString().indexOf("Wrong password") != -1 ? styles.errPwd : styles.errpwdHidden
                }> {this.props.data.error} 
              </div>
            <br/>
            <Button size="large" color="success" hollow onClick={this.handleClick}>Login</Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  regFormPlaceholder: state.comparison.regFormPlaceholder,
  loginInput: state.comparison.userLogInput,
  error: state.comparison.error
});

const mapDispatchToProps = {
  updateCurrentLoginInput,
  login
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Auth);

