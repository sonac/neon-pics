import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Question, User, State as ComparisonState } from 'state/comparison/types';
import { IdActionCreator } from 'state/types';
import { fetchAnswerResult } from '../../state/comparison/actions';

const styles = require('./styles.css');

interface Data {
  isLoading: boolean;
  questions: Array<Question>;
  currentUser: User;
}

interface Actions {
  fetchAnswerResult: IdActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class AnsweredQuestions extends Component<Props, State> {

  handleClick = (id) => {
    this.props.actions.fetchAnswerResult(id);
  }

  render() {
    const { isLoading, questions, currentUser } = this.props.data;
    if (isLoading) {
      return <div className={styles.header}><div>Loading...</div></div>;
    }
    else if (!currentUser) {
      return <div className={styles.header}>Log into neon pics to see answers</div>
    }
    else {
      return (
        <div className={styles.wrapper}>
          <ol>{questions.map((question) => (
            <Link key={question.id} to={`/answer/${question.id}`}>
              <li key={question.id} 
                onClick={() => this.handleClick(question.id)}>{question.text}
              </li>
            </Link>
          ))}
          </ol>
        </div>
      )
    }
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  isLoading: state.comparison.isLoading,
  questions: state.comparison.answeredQuestions,
  currentUser: state.comparison.currentUser
});

const mapDispatchToProps = {
  fetchAnswerResult
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AnsweredQuestions);
