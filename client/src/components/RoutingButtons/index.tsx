import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReactModal from 'react-modal';
import { User, State as ComparisonState } from 'state/comparison/types';
import { loginSwitcher } from 'state/comparison/actions';
import { BasicActionCreator } from 'state/types';
import Auth from 'components/Auth';

const styles = require('./styles.css')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

interface Data {
  showLogin: boolean;
  currentUser: User;
}

interface Actions {
  loginSwitcher: BasicActionCreator
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class RoutingButtons extends Component<Props, State> {

  handleClick = () => {
    console.log(this.props.data.showLogin);
    this.props.actions.loginSwitcher();
  }

  render() {
    const currentUser = this.props.data.currentUser;

    return (
      <div className={styles.routingButtons}>
        <div className={styles.homeButton}>
          <Link to="/"><Button size="large" color="success" hollow>Home</Button></Link>
        </div>
        <div className={currentUser ? styles.hidden :  styles.authButton}>
          <Link to="/register"><Button size="large" hollow>Register</Button></Link>
          <div className={styles.login}><Button size="large" hollow onClick={this.handleClick}>Login</Button></div>
          <ReactModal
          isOpen={this.props.data.showLogin}
          contentLabel="Male, female or its a trap?"
          onRequestClose={this.handleClick}
          className={styles.loginWindow}
          overlayClassName={styles.loginOverlay}
          ariaHideApp={false}
          >
            <Auth />
          </ReactModal>
        </div>
        <div className={currentUser ? styles.welcome : styles.hidden}><h2>Welcome, {currentUser.login}!</h2></div>
      </div>
    );
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  showLogin: state.comparison.showLogin,
  currentUser: state.comparison.currentUser
});

const mapDispatchToProps: Actions = {
  loginSwitcher
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RoutingButtons);