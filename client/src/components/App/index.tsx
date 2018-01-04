import React from 'react';
import PicsPair from 'components/PicsPair';
const styles = require('./styles.css');

export default function App() {
  return (
    <div className={styles.app}>
      <PicsPair />
    </div>
  );
}