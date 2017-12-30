import React, { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';
import styles from './styles.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { postComparison, nextTwo } from 'state/comparison/actions';

class NavButtons extends Component {

  static propTypes = {
    data: PropTypes.shape({
      currentPicPairIndex: PropTypes.int,
      limit: PropTypes.int,
      currentVote: PropTypes.int
    }),
    actions: PropTypes.shape({
      postComparison: PropTypes.func,
      nextTwo: PropTypes.func
    }),
  };

  sendClicked = () => {
    this.props.actions.postComparison();
  }

  handleClick = () => {
    const { currentPicPairIndex, limit, currentVote } = this.props.data;
    if (!currentVote) {
      alert("Please choose one pic")
    }
    else if (currentPicPairIndex >= limit - 1) {
      console.log("done")
    }
    else {
      this.props.actions.nextTwo()
    }
  }

  render() {
    return (
      <div className={styles.navButtons}>
        <Button color="secondary" size="large" hollow onClick={this.handleClick}>Next pair</Button>
        <Button color="secondary" size="large" hollow onClick={this.sendClicked}>Send results</Button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  currentPicPairIndex: state.comparison.currentPicPairIndex,
  limit: state.comparison.combs.length,
  currentVote: state.comparison.currentVote
});

const mapDispatchToProps = {
  postComparison,
  nextTwo
};

const mergeProps = (data, actions) => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NavButtons);
