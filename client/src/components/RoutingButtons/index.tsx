import * as React from 'react';
import { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ReactModal from 'react-modal';
import { User, State as ComparisonState } from 'state/comparison/types';
import { loginSwitcher, logout } from 'state/comparison/actions';
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
  loginSwitcher: BasicActionCreator,
  logout: BasicActionCreator
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class RoutingButtons extends Component<Props, State> {

  handleClick = (evt) => {
    if (evt === "auth") {
      this.props.actions.loginSwitcher();
    }
    else if (evt === "out") {
      this.props.actions.logout();
    }
    else if (evt === "home") {
      window.location.reload();
    }
  }

  render() {
    const currentUser = this.props.data.currentUser;
    const name = currentUser ? currentUser.login : "";

    return (
      <div className={styles.routingButtons}>
        <div className={styles.homeButton}>
          <Link to="/"> <Button size="large" 
                                color="success" 
                                hollow
                                onClick={(evt) => this.handleClick("home")}>
                                  Home
                        </Button>
          </Link>
        </div>
        <div className={styles.addButton}>
          <Link to="/comparison"> <Button size="large" 
                                hollow>
                                  Add Questionnaire
                        </Button>
          </Link>
        </div>
        <div className={currentUser ? styles.hidden :  styles.authButton}>
          <Link to="/register"><Button size="large" hollow>Register</Button></Link>
          <div className={styles.login}><Button size="large" 
                                                hollow 
                                                onClick={(evt) => this.handleClick("auth")}>
                                          Login
                                        </Button>
          </div>
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
        <div className={currentUser ? styles.welcome : styles.hidden}>
          <h2>Welcome, {name}!</h2>
          <div className={styles.logout}><Button color="secondary" 
                                                 size="large" 
                                                 hollow 
                                                 onClick={(evt) => this.handleClick("out")}>
                                           Logout
                                         </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  showLogin: state.comparison.showLogin,
  currentUser: state.comparison.currentUser
});

const mapDispatchToProps: Actions = {
  loginSwitcher,
  logout
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RoutingButtons);