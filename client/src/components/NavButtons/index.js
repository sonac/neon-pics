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
      pics: PropTypes.array,
      curPics: PropTypes.array
    }),
    actions: PropTypes.shape({
      postComparison: PropTypes.func,
      nextTwo: PropTypes.func
    }),
  };

  sendClicked() {
    this.props.actions.postComparison();
  }

  nextClicked() {
    const { pics, curPics } = this.props.data;
    const maxId = pics.map(x => x.id).reduce((x, y) => Math.max(x, y));
    if (curPics[1] >= maxId) console.log("done");
    else this.props.actions.nextTwo();
  }

  render() {
    return (
      <div className={styles.navButtons}>
        <Button color="secondary" size="large" hollow onClick={() => this.nextClicked()}>Next pair</Button>
        <Button color="secondary" size="large" hollow onClick={() => this.sendClicked()}>Send results</Button>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  pics: values(state.comparison.pics),
  curPics: state.comparison.curPics
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
