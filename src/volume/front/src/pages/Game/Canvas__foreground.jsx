import './Game.css'
import React, { useState, useEffect, useRef} from 'react'

const Canvas__foreground = (props) => {
  
  const canvasRef = useRef(null);
  const CANV_W = props.width;
  const CANV_H = props.height;

  const ball_r = 15;
  const [ballx, setBallX] = useState(CANV_W / 2);
  const [bally, setBallY] = useState(CANV_H / 2);

  const draw_ball = (ctx, frameCount, x, y) => {
    console.log(x, y);
    const rad = ball_r + 2*Math.sin(frameCount*0.05)**2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.ellipse(x, y, rad, rad, 0, 0, 2*Math.PI);
    ctx.fill()
  }

  const socket = props.socket;
  socket.on("update", (x, y) => {
    setBallX(x);
    setBallY(y);
  })
  
  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    let frameCount = 0
    let animationFrameId

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
      frameCount++;
      draw_ball(context, frameCount, ballx, bally);
    }
    render() 

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  })
  
  return ( <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/> );
}

export default Canvas__foreground