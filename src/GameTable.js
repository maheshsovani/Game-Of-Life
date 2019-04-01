import React from 'react';
import './index.css';
import GameOfLife from './gameOfLife';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.GameOfLife = GameOfLife;
    this.bounds = {
      topLeft: [0, 0],
      bottomRight: [this.props.size - 1, this.props.size - 1]
    };
    this.makeCellAlive = this.makeCellAlive.bind(this);
    this.nextGeneration = this.GameOfLife.nextGeneration.bind(this);
    this.getNextGeneration = this.getNextGeneration.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.state = { aliveCells: [] };
  }

  makeCellAlive(event) {
    let id = event.target.id;
    this.state.aliveCells.push(id.split('_').map(e => +e));
    let element = document.getElementById(id);
    element.style.backgroundColor = 'orange';
  }

  colorNextGeneration(nextGen) {
    nextGen.forEach(cell => {
      let id = cell.join('_');
      document.getElementById(id).style.background = 'orange';
    });
  }

  removeCurrentGenerationColor() {
    this.state.aliveCells.forEach(cell => {
      let id = cell.join('_');
      document.getElementById(id).style.background = 'lightgray';
    });
  }

  getNextGeneration() {
    let nextGen = this.nextGeneration(this.state.aliveCells, this.bounds);
    this.removeCurrentGenerationColor();
    this.colorNextGeneration(nextGen);
    this.setState(state => (state.aliveCells = nextGen));
  }

  startGame() {
    this.timerId = setInterval(() => {
      this.getNextGeneration();
    }, 400);
  }

  stopGame() {
    clearInterval(this.timerId);
  }

  createTableRow(rowIndex) {
    let row = [];
    for (let columnIndex = 0; columnIndex < this.props.size; columnIndex++) {
      let ids = rowIndex + '_' + columnIndex;
      row.push(<td onClick={this.makeCellAlive} id={ids} key={ids} />);
    }
    return row;
  }

  createTable() {
    let table = [];
    for (let rowIndex = 0; rowIndex < this.props.size; rowIndex++) {
      let row = this.createTableRow(rowIndex);
      table.push(<tr key={rowIndex}>{row}</tr>);
    }
    return <tbody id='table-body'>{table}</tbody>;
  }

  render() {
    return (
      <div>
        <h2>Welcome to Game of Life</h2>
        <div className='table-view'>
          <table id='table'>{this.createTable()}</table>
        </div>
        <div className='button-view'>
          <button onClick={this.startGame}>Start</button>
          <button onClick={this.stopGame}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Table;
