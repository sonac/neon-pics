import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComparison } from 'state/comparison/actions';
import styles from './styles.css';

class PicsPair extends Component {
  static propTypes = {
    data: PropTypes.shape({
      isLoading: PropTypes.boolean,
      pics: PropTypes.array
    }),
    actions: PropTypes.shape({
      fetchComparison: PropTypes.func
    }),
  };

  componentDidMount() {
    this.props.actions.fetchComparison();
  }

  render() {
    const { pics, isLoading } = this.props.data;

    return (
      <div className={styles.picsPair}>
        {isLoading || pics.length < 2
          ? <div>Loading...</div>
          : <div className={styles.wrapper}>
              <img src={pics[0].url} alt="First pic"/>
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
  pics: state.comparison.entity.pics
});

const mapDispatchToProps = {
  fetchComparison
};

const mergeProps = (data, actions) => ({
  data,
  actions
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PicsPair);
