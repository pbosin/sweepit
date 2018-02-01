import React from 'react';

export default class GameResult extends React.Component {
  render() {
    let userResult = '';
    if (this.props.gameResult === 'won') {
      userResult = 'Congrats!!!'
    } else if (this.props.gameResult === 'lost') {
      userResult = 'Oops... Game over.';
    }
    return (
        <h1 className="text-center">{ userResult }</h1>
    );
  }
}
