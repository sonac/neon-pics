import React, { Component } from 'react';
import { Button } from 'react-foundation-components/lib/button';

export default class NavButtons {

  render() {
    return (
      <div className={styles.navButtons}>
        <Button color="success" size="large">Next pair</Button>
        <Button color="success" size="large">Send results</Button>
      </div>
    )
  }

}
