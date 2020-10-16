import React, {Component} from 'react';
import Router from 'next/router';
import Link from 'next/link';

export default class Index extends Component {
  componentDidMount = () => {
    Router.push('/admin/login');
  };

  render() {
    return <div />;
  }
}
