import React from 'react';

export class GameStatus extends React.Component {

  constructor(props) {
    super(props);
    // handle timer with seconds counter within the component state, not in redux store
    this.state = Object.assign({},this.state,{
      timerId: null,
      counter: 0
    });
  }

  tick() {
    this.setState({counter: this.state.counter + 1});
  }

  componentWillReceiveProps(nextProps) {
      if (!this.props.isFinished && nextProps.isFinished && this.state.timerId) {
          //stop timer if done
          clearInterval(this.state.timerId);
      } else if (!this.props.isStarted && nextProps.isStarted) {
          //reset timer when user clicks field after level selection
          if (this.state.timerId) {
              clearInterval(this.state.timerId);
          }
          let id = setInterval(this.tick.bind(this), 1000);
          this.setState({counter: 0, timerId: id});
      }
  }

  render() {
      if (!this.props.rowsLength) {
          return null;
      } else {
          return (
            <div className={'game-status level' + this.props.level}>
              <div className={'mines-found'}>{this.props.minesLeft}</div>
              <div className={'timer'}>{this.state.counter}</div>
            </div>
          );
      }
  }
}
