import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from 'state/comparison/actions';
import styles from './styles.css';

class PicsPair extends Component {
  static propTypes = {
    data: PropTypes.shape({
      isLoading: PropTypes.boolean,
      pics: PropTypes.array,
      question: PropTypes.string
    }),
    actions: PropTypes.shape({
      fetchComparison: PropTypes.func,
      pictureClick: PropTypes.func
    }),
  };

  componentDidMount() {
    this.props.actions.fetchComparison();
  }

  click(pics, url) {
    this.props.actions.pictureClick(pics, url);
    console.log(this.props.data.pics);
  }

  render() {
    const { pics, isLoading, question } = this.props.data;

    return (
      <div className={styles.picsPair}>
        <h1>{question}</h1>
        {isLoading || pics.length < 2
          ? <div>Loading...</div>
          : <div className={styles.wrapper}>
              <img src={pics[0].url} alt="First pic" onClick = {() => this.click(pics, pics[0].url)}/>
              <div className={styles.versus}><span>VS</span></div>
              <img src={pics[1].url} alt="Second pic"/>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.comparison.isLoading,
  pics: state.comparison.pics,
  question: state.comparison.question
});

const mapDispatchToProps = {
  fetchComparison,
  pictureClick
};

const mergeProps = (data, actions) => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PicsPair);
