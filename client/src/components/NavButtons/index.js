import React, { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import styles from './styles.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { postComparison } from 'state/comparison/actions';

class NavButtons extends Component {

  static propTypes = {
    data: PropTypes.shape({
    }),
    actions: PropTypes.shape({
      postComparison: PropTypes.func
    }),
  };

  clicked() {
    this.props.actions.postComparison();
  }

  render() {
    return (
      <div className={styles.navButtons}>
        <Button color="secondary" size="large" hollow>Next pair</Button>
        <Button color="secondary" size="large" hollow onClick={() => this.clicked()}>Send results</Button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  postComparison
};

const mergeProps = (data, actions) => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavButtons);
