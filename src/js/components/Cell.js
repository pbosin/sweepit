import React from 'react';

export class Cell extends React.Component {
  constructor(props) {
      super(props);
      this.setClassAndText(props)
  }

  setClassAndText(props) {
      this.class = 'cell';
      this.txt = ' ';
      if(props.masked) {
          this.class += ' masked';
          if (props.marked) {
              this.class += ' glyphicon glyphicon-certificate';
          }
      } else if (props.mine) {
          this.class += ' glyphicon glyphicon-certificate mine';
      } else if (props.count > 0) {
          this.txt = '' + this.props.count;
      }
  }

  onClick(e) {
      e.preventDefault();
      this.props.leftClick(this.props.rowIndex, this.props.colIndex);
  }
  onRightClick(e) {
      e.preventDefault();
      this.props.rightClick(this.props.rowIndex, this.props.colIndex);
  }

  render() {
      this.setClassAndText(this.props);
      return (
        <div
            onClick={this.onClick.bind(this)}
            onContextMenu={this.onRightClick.bind(this)}
            className={this.class}>
            {this.txt}
        </div>
      );
  }
}
