import React from 'react';
// import ReactDOM from 'react-dom';
import '../style/ticktacktoe.css'

function Square(props) {
    
    return (
        <button
        className="square"
        onClick={props.onClick}
        style={{color: props.colorChange? 'red':'black'}}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i){
        return (
        <Square 
            key={i}
            colorChange={this.props.line.includes(i)}
            value={this.props.squares[i]}
            onClick={()=>{this.props.onClick(i)}}
        />
        )
    }
    
    renderRow(i){
        const squares = []
        for(let o = 0; o < 3; o++){
            squares.push(this.renderSquare((i*3)+o))
        }
        return(
            <div className="board-row" key={i}>
                {squares}
            </div>
        ) 
    }

    render() {
        const grid = []
        for(let i = 0; i < 3; i++){
            grid.push(this.renderRow(i))
        }
        return (
            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>{grid}</div>
        );
    }
}


export default class Game extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: {},
              }],
            stepNumber: 0,
            xIsNext: true,
            selected: false,
            reversed: false,
        }
    }
    
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const location = moveLocation(i)

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                location: location,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            selected: false,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            selected: true
        });
    }

    render() {
        const history = this.state.history        
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move)=>{
            const desc = move ?
                `Go to move #${move} ${step.location.column}${step.location.row}`:
                'Go to game start';
            return (
                <li key = {step.toString()} >
                    <button 
                        onClick={()=>{this.jumpTo(move)}} 
                        style={this.state.selected && this.state.stepNumber === move ? 
                        {fontWeight: 'bold'} : 
                        {fontWeight: 'normal'}}
                    >{desc}</button>
                </li>
            );
        });

        let status;
        if(winner) {
            status = 'Winner: ' + winner.player;
        }else if(!winner && this.state.stepNumber === 9){
            status = 'DRAW'
        }else{
            status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        line={winner ? winner.line: []}
                        squares={current.squares}
                        onClick={(i)=> this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol style={this.state.reversed?
                        {display: 'flex', flexDirection: 'column-reverse'} : 
                        {display: 'flex', flexDirection: 'column'}} 
                     >{moves}</ol>
                    <button onClick={()=>{this.setState({reversed: !this.state.reversed})}}>toggle history direction</button>
                </div>
            </div>
        )
    }
}


// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// )

function moveLocation(position){
    const board = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ]

    for(let i = 0; i < board.length; i++){
        const [a,b,c] = board[i]
        
        if (position === a){
            return {column: 'A', row: (i + 1)}
        }else if(position === b){
            return {column: 'B', row: (i + 1)}
        }else if(position === c){
            return {column: 'C', row: (i + 1)}
        }
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {player: squares[a], line: [a,b,c]};
      }
    }
    return null;
}

