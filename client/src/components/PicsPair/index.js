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
      pics: PropTypes.array,
      question: PropTypes.string
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

  handleClick = id => () => {
    this.props.actions.pictureClick(id)
    console.log(this.props.data.pics)
  }

  render() {
    const { pics, isLoading, question } = this.props.data;

    return (
      <div className={styles.picsPair}>
        {isLoading || pics.length < 2
          ? <div>Loading...</div>
          : <div>
              <h1>{question}</h1>
              <div className={styles.wrapper}>
                <img src={pics[0].url} alt="First pic" onClick={this.handleClick(pics[0].id)}/>
                <div className={styles.versus}><span>VS</span></div>
                <img src={pics[1].url} alt="Second pic" onClick={this.handleClick(pics[1].id)}/>
              </div>
            </div>
        }
        <NavButtons />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.comparison.isLoading,
  pics: values(state.comparison.pics),
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
