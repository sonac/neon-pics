import * as React from 'react';
import { Button } from 'react-foundation-components/lib/button';
import { Link } from 'react-router-dom';
import AuthButton from 'components/AuthButton';

const styles = require('./styles.css')

export default function RoutingButtons() {
  return (
    <div className={styles.routingButtons}>
      <div className={styles.homeButton}>
        <Link to="/"><Button color="success" size="large" hollow>Home</Button></Link>
      </div>
      <div className={styles.authButton}>
        <Link to="/register"><AuthButton /></Link>
      </div>
    </div>
  );
}