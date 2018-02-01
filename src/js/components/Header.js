import React, {Component} from 'react';
import { newGame } from '../actions/actions';
import { connect } from 'react-redux';

class Header extends Component {

  constructor (props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
      this.props.dispatch(newGame());
  };

  render() {
    return (
      <h1 className="text-center">Sweep it!
        <button onClick={this.handleClick} className='btn btn-sm btn-warning ml10'>
          <span className="glyphicon glyphicon-refresh"></span>
        </button>
      </h1>
    );
  }
}

export default connect()(Header);