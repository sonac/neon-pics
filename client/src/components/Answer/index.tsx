import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Picture, User, State as ComparisonState } from 'state/comparison/types';

const styles = require('./styles.css');

interface Data {
  isLoading: boolean;
  questionnaireResult: Array<Picture>;
  currentUser: User;
}

interface Actions {
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class Answer extends Component<Props, State> {
  render() {
    const { isLoading, questionnaireResult, currentUser } = this.props.data;
    if (isLoading) {
      return <div className={styles.header}><div>Loading...</div></div>;
    }
    else if (!currentUser) {
      return <div className={styles.header}>
        Log into neon pics to see results for this questionnaire
      </div>
    }
    else {
      const pics = questionnaireResult.sort((a, b) => b.rating - a.rating)
      return(
        <div className={styles.wrapper}>Results for this questionnaire:
          <div className={styles.pics}>
            <ol>
              {pics.map((p) => (
                <div key={p.id} className={styles.element}><li><img src={p.url}/>: {p.rating}</li></div>
              ))}
            </ol>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  isLoading: state.comparison.isLoading,
  questionnaireResult: state.comparison.questionnaireResult,
  currentUser: state.comparison.currentUser
});

const mapDispatchToProps = {
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Answer);
