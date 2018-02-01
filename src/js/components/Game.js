import React, {Component} from 'react';
import { Cell } from '../components/Cell';
import GameStatusContainer from '../containers/GameStatusContainer';

class Game extends Component {
    constructor(props) {
        super(props);
    }

    renderCell(cell, i, j) {
        return (
            <td key={'cell-' + j}>
                <Cell
                    masked={cell.masked}
                    marked={cell.marked}
                    count={cell.count}
                    mine={cell.mine}
                    rowIndex={i}
                    colIndex={j}
                    leftClick={this.props.leftClick}
                    rightClick={this.props.rightClick}/>
            </td>
        );
    }

    renderRow(row, i) {
        return (
            <tr key={'row-' + i}>
                {row.map((cell,j) => this.renderCell(cell, i, j))}
            </tr>
        );
    }

    render() {
        if (!this.props.field.rows.length) {
            return null;
        } else {
            return (
              <div>
                  <GameStatusContainer/>
                  <table>
                      <tbody>
                        {this.props.field.rows.map((row,rowIndex) => this.renderRow(row,rowIndex))}
                      </tbody>
                  </table>
              </div>
            );
        }
    }
}

export default Game;