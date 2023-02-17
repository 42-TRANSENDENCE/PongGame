import './Game.css'
import React, {useEffect, useRef} from 'react'

const Canvas__background = (props) => {
  const canvasRef = useRef(null);
  const CANV_W = props.width;
  const CANV_H = props.height;

  const draw_table = (table_ctx) => {
    const W = table_ctx.canvas.width;
    const H = table_ctx.canvas.height;
    const P = 5;
    table_ctx.fillStyle = '#333333';
    table_ctx.fillRect(0, 0, W, H);

    table_ctx.beginPath();
    table_ctx.lineWidth = 1;
    table_ctx.strokeStyle = 'red';
    table_ctx.moveTo(P, P);
    table_ctx.lineTo(W - P, P);
    table_ctx.lineTo(W - P, H - P);
    table_ctx.lineTo(P, H - P);
    table_ctx.lineTo(P, P);
    table_ctx.closePath();
    table_ctx.stroke();

    table_ctx.beginPath();
    table_ctx.setLineDash([H / 83]);
    table_ctx.lineWidth = 1;
    table_ctx.strokeStyle = 'white';
    table_ctx.moveTo(W / 2, 0);
    table_ctx.lineTo(W / 2, H);
    table_ctx.stroke();
    table_ctx.setLineDash([]);
  };

  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // props.socket.on("score_update", (score) => {
    //   draw_score(context, score);
    // })
    draw_table(context);
  }, []);

  return ( <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/> );
}


export default Canvas__background