import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { fetchComparison, pictureClick, nextTwo } from 'state/comparison/actions';
import { PicturesMap, SortState, State as ComparisonState } from 'state/comparison/types';
import { IdActionCreator, BasicActionCreator } from 'state/types';

import NavButtons from 'components/NavButtons';

const styles = require('./styles.css');

interface Data {
  isLoading: boolean;
  pics: PicturesMap;
  question: string;
  currentPicPairIndex: number;
  combs: [number, number][];
  currentVote: number;
  limit: number;
  sortState: SortState;
}

interface Actions {
  fetchComparison: IdActionCreator;
  pictureClick: IdActionCreator;
  nextTwo: BasicActionCreator;
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
    // TODO: combine pictureClick and nextTwo into one action
    const { sortState, pics } = this.props.data;
    if (sortState.sortedPart.length == Object.keys(pics).length) {
      console.log("done")
    }
    else {
      this.props.actions.pictureClick(id);
      this.props.actions.nextTwo();
    }
  };

  render() {
    const { pics, isLoading, question, currentPicPairIndex, combs, currentVote, sortState } = this.props.data;

    if (isLoading) {
      return <div className={styles.picsPair}><div>Loading...</div></div>;
    }
    else if (sortState.sortedPart.length == Object.keys(pics).length) {
      return <div className={styles.picsPair}>
               <img src="https://c1.staticflickr.com/7/6095/6385016345_f19d5414a7_b.jpg" />
             </div>;
    }

    const pic1 = pics[sortState.picsToCompare[0]];
    const pic2 = pics[sortState.picsToCompare[1]];

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
  currentVote: state.comparison.currentVote,
  limit: state.comparison.combs.length,
  sortState: state.comparison.sortState
});

const mapDispatchToProps = {
  fetchComparison,
  pictureClick,
  nextTwo
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PicsPair);