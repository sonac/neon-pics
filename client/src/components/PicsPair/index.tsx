import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { fetchComparison, pictureClick } from 'state/comparison/actions';
import { PicturesMap, State as ComparisonState } from 'state/comparison/types';

import NavButtons from 'components/NavButtons';

const styles = require('./styles.css');

interface Data {
  isLoading: boolean;
  pics: PicturesMap;
  question: string;
  currentPicPairIndex: number;
  combs: [number, number][];
  currentVote: number;
}

interface Actions {
  fetchComparison: Function;
  pictureClick: Function;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class PicsPair extends Component<Props, State> {
  componentDidMount() {
    // TODO: remove hardcoded id
    this.props.actions.fetchComparison(1);
  }

  picClick = id => () => {
    this.props.actions.pictureClick(id);
  };

  render() {
    const { pics, isLoading, question, currentPicPairIndex, combs, currentVote } = this.props.data;

    if (isLoading) {
      return <div className={styles.picsPair}><div>Loading...</div></div>;
    }

    const pic1 = pics[combs[currentPicPairIndex][0]];
    const pic2 = pics[combs[currentPicPairIndex][1]];

    /*let leftBorder = "0",
        rightBorder = "0";

    if (!isLoading) {
      if (pic1.id === currentVote) {
        leftBorder = "10";
        rightBorder = "0";
      }
      else if (pic2.id === currentVote) {
        leftBorder = "0";
        rightBorder = "10";
      }
      else {
        leftBorder = "0";
        rightBorder = "0";
      }
    }*/

    return (
      <div className={styles.picsPair}>
        <div>
          <h1>{question}</h1>
          <div className={styles.wrapper}>
            <img src={pic1.url}
                 alt="First pic"
                 onClick={this.picClick(pic1.id)}
            />
            <div className={styles.versus}><span>VS</span></div>
            <img src={pic2.url}
                 alt="Second pic"
                 onClick={this.picClick(pic2.id)}
            />
          </div>
          <NavButtons />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  isLoading: state.comparison.isLoading,
  pics: state.comparison.pics,
  question: state.comparison.question,
  currentPicPairIndex: state.comparison.currentPicPairIndex,
  combs: state.comparison.combs,
  currentVote: state.comparison.currentVote
});

const mapDispatchToProps = {
  fetchComparison,
  pictureClick
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PicsPair);
