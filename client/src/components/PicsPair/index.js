import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from 'state/comparison/actions';
import styles from './styles.css';
import NavButtons from 'components/NavButtons';

class PicsPair extends Component {
  static propTypes = {
    data: PropTypes.shape({
      isLoading: PropTypes.boolean,
      pics: PropTypes.object,
      question: PropTypes.string,
      curPics: PropTypes.int,
      combs: PropTypes.array,
      curVote: PropTypes.int
    }),
    actions: PropTypes.shape({
      fetchComparison: PropTypes.func,
      pictureClick: PropTypes.func
    }),
  };

  componentDidMount() {
    // TODO: remove hardcoded id
    this.props.actions.fetchComparison(1);
  }

  picClick = id => () => {
    this.props.actions.pictureClick(id);
  }

  render() {
    const { pics, isLoading, question, curPics, combs, curVote } = this.props.data;

    let leftBorder = "0",
        rightBorder = "0"

    if (!isLoading) {
      if (pics[combs[curPics][0]].id == curVote) {
        leftBorder = "10"
        rightBorder = "0"
      }
      else if (pics[combs[curPics][1]].id == curVote) {
        leftBorder = "0"
        rightBorder = "10"
      }
      else {
        leftBorder = "0"
        rightBorder = "0"
      }
    }

    return (
      <div className={styles.picsPair}>
        {isLoading || pics.length < 2
          ? <div>Loading...</div>
          : <div>
              <h1>{question}</h1>
              <div className={styles.wrapper}>
                <img src={pics[combs[curPics][0]].url} alt="First pic" onClick={this.picClick(pics[combs[curPics][0]].id)} border={leftBorder}/>
                <div className={styles.versus}><span>VS</span></div>
                <img src={pics[combs[curPics][1]].url} alt="Second pic" onClick={this.picClick(pics[combs[curPics][1]].id)} border={rightBorder}/>
              </div>
              <NavButtons />
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.comparison.isLoading,
  pics: state.comparison.pics,
  question: state.comparison.question,
  curPics: state.comparison.curPics,
  combs: state.comparison.combs,
  curVote: state.comparison.curVote
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
