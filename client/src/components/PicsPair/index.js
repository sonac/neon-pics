import React, { Component } from 'react';
import styles from './styles.css';

export default class PicCompare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      urls: []
    };
  };

  componentDidMount() {
    fetch('/api/pictures')
      .then(response => response.json())
      .then(urls => this.setState(state => ({urls, isLoading: false})));
  }


  render() {
    const { urls, isLoading } = this.state;

    return (
      <div className={styles.picsPair}>
        {isLoading
          ? <div>Loading...</div>
          : <div className={styles.wrapper}>
              <img src={urls[0]} alt="First pic"/>
              <div className={styles.versus}><span>VS</span></div>
              <img src={urls[1]} alt="Second pic"/>
            </div>
        }
      </div>
    );
  }
}
