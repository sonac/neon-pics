import * as React from 'react';
import PicsPair from 'components/PicsPair';
import AuthButton from 'components/AuthButton';
import RoutingButtons from 'components/RoutingButtons'
const styles = require('./styles.css');

export default function App() {
  return (
    <div className={styles.app}>
      <RoutingButtons />
      <AuthButton />
      <PicsPair />
    </div>
  );
}