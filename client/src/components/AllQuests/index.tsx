import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { QuestionnaireSeq, State as ComparisonState } from 'state/comparison/types';
import { fetchAllQuestionnaires, loadComparison } from '../../state/comparison/actions';
import { BasicActionCreator } from 'state/types';

const styles = require('./styles.css');

interface Data {
  isLoading: boolean;
  quests: QuestionnaireSeq
}

interface Actions {
  fetchAllQuestionnaires: BasicActionCreator;
  loadComparison: BasicActionCreator;
}

interface Props {
  data: Data;
  actions: Actions;
}

type State = {}

class AllQuests extends Component<Props, State> {

  componentDidMount() {
    this.props.actions.fetchAllQuestionnaires();
  }

  handleClick = id => () => {
    this.props.actions.loadComparison();
  }

  render() {
    const { isLoading, quests } = this.props.data
    if (isLoading) {
      return <div className={styles.header}><div>Loading...</div></div>;
    }
    else {
      return(
        <div className={styles.header}>Choose questionnaire
          <div className={styles.wrapper}>
            {quests.filter(q => q.pics.length > 0 && (q.pics[0].url.endsWith(".jpeg") || 
              q.pics[0].url.endsWith(".jpg") ||
              q.pics[0].url.endsWith(".png"))).map((quest, idx) => (
              <div key={idx} className={styles.quests}>
                <Link to={`/questionnaire/${quest.id}`}><img src={quest.pics[0].url} onClick={this.handleClick(quest.id)}/></Link>
                {quest.question}
              </div>)    
            )}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state: {comparison: ComparisonState}): Data => ({
  isLoading: state.comparison.isLoading,
  quests: state.comparison.questionnaires
});

const mapDispatchToProps = {
  fetchAllQuestionnaires,
  loadComparison
};

const mergeProps = (data: Data, actions: Actions): Props => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AllQuests);
