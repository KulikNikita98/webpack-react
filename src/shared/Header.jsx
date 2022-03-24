import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styles from './header.scss';

export function HeaderComponent() {
  return (<header>
    <h1 className={styles.example}> Hello, Webpack! </h1>
  </header>)
}

export const Header = hot(HeaderComponent)
