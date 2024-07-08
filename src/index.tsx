import React, { MouseEventHandler, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props:{onClick:MouseEventHandler<HTMLButtonElement>, value:String}) => {
      return (
        <button 
        className="square" 
        onClick={props.onClick}
        >
        {props.value}
        </button>
      );
  }

  const Board1 = (prop) => {

    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
    const [isNextMoveX, setIsNextMoveX] = useState(true);
    const [winner, setWinner] = useState<String | null>(null);

    const checkWinner = (squares:String[]):String|null => {
      let checkIndexs = [0, 3, 6]; 
        for (let i = 0 ; i < checkIndexs.length; i++){
            var n = checkIndexs[i];

            var result = (squares[n  + 0] != null && squares[n  + 0] === squares[n + 1] && squares[n + 1] === squares[n + 2] && squares[n + 0] === squares[n + 2]);
            
            if(result){
                return squares[n];
            }
        }
        checkIndexs = [0, 1, 2]; 
        for (let i = 0 ; i < checkIndexs.length; i++){
            if(squares[i + 0] != null && squares[i + 0] === squares[i + 3] &&  squares[i + 3] === squares[i + 6] &&  squares[i + 0] === squares[i + 6]){
                return squares[i];
            }
        }

        if(squares[0] != null && squares[0] === squares[4] && squares[4] === squares[8] && squares[8] === squares[0]){
            return squares[0];
        }else if(squares[2] != null && squares[2] === squares[4] &&  squares[4] === squares[6] && squares[2] === squares[6]){
            return squares[2];
        }
        return null;
    }

    const handleClick = (index: number) => {
      if (squares[index] == null) {
        squares[index] = isNextMoveX ? 'X' : 'O';
        setIsNextMoveX(isNextMoveX ? false : true);
      }
    }

    useEffect(() => {
      setSquares(squares);
      setWinner(checkWinner(squares));
      prop.refreshStatus(winner === null ? `Next player: ${isNextMoveX ? 'X' : 'O'}` : `Winner is ${winner}`);
    }, [squares, winner, isNextMoveX]);

    const renderRow = (index:number) => {
      return (
        <div className="board-row">
        <Square value = {squares[index*3]} onClick = {()=> handleClick(index*3)} />
        <Square value = {squares[index*3+1]} onClick = {()=> handleClick(index*3 + 1)} />
        <Square value = {squares[index*3+2]} onClick = {()=> handleClick(index*3 + 2)} />
      </div>
      );
    }

    return (
      <div>
        {renderRow(0)}
        {renderRow(1)}
        {renderRow(2)}
      </div>
    );
  }
  
  const Status = (prop:{status:String}) => {
    return (
      <div className="status">{prop.status}</div>
    );
  }
  
  const Game = () => {
      const [status, setStatus] = useState<String>('Next Player is X');

      const refreshStatus = (status: String) => {
        setStatus(status);
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board1 refreshStatus = {refreshStatus} />
          </div>
          <div className="game-info">
            <Status status = {status}/>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
  }
  
  // ========================================
  let rootElement = document.getElementById("root");
  if(rootElement != null){
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Game />);
  }
  


  
  