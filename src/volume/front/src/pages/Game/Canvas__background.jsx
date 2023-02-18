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
    table_ctx.font = "320px Arial";
    table_ctx.textBaseline = "middle"
    table_ctx.textAlign = "center"
    table_ctx.strokeStyle = "wheat"
    table_ctx.strokeText(`:`, CANV_W / 2 , CANV_H * 0.5)
  };

  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    props.socket.on("update_score", (score) => {
      draw_score(context, score);
    });
    draw_table(context);
    const a = 5;
    const b = 2;
    draw_score(context, [0,0])
    

    return () => {
      props.socket.off("update_score")
    }
  }, []);

  function draw_score(table_ctx, scores) {
    const W = table_ctx.canvas.width;
    const H = table_ctx.canvas.height;
    const P = 10;
    table_ctx.fillStyle = '#333333';
    table_ctx.fillRect(P, P, W/2 - 3*P, H - 2*P);
    table_ctx.fillRect(W/2 + 3*P, P, W/2 - 6*P, H - 2*P);
    table_ctx.fillStyle = "grey";
    table_ctx.font = "300px Arial";
    table_ctx.strokeStyle = ""
    table_ctx.strokeText(`${scores[0]}    ${scores[1]}`, CANV_W / 2 , CANV_H * 0.52)
    table_ctx.fillText(`${scores[0]}    ${scores[1]}`, CANV_W / 2 , CANV_H * 0.52)
  }

  return ( <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/> );
}


export default Canvas__background