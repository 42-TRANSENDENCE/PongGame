import './Game.css'
import React, { useState, useEffect, useRef} from 'react'

const Canvas__foreground = (props) => {
  
  const canvasRef = useRef(null);
  const CANV_W = props.width;
  const CANV_H = props.height;

  const ball_rad = 15;
  const [ball_pos, setBallPos] = useState([(CANV_W / 2), (CANV_H / 2) ]);

  const draw_ball = (ctx, pos) => {
    console.log("draw", pos[0], pos[1]);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.ellipse(pos[0], pos[1], ball_rad, ball_rad, 0, 0, 2*Math.PI);
    ctx.fill()
  }
  
  
  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    props.socket.on("update", (x, y) => {
      console.log("update", x, y)
      setBallPos([x, y]);
      props.socket.off("update");
    })
    
    draw_ball(context, ball_pos);
  }, [ball_pos])

  
  return ( <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/> );
}

export default Canvas__foreground