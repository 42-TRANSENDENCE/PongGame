import './Game.css'
import React, { useState, useEffect, useRef} from 'react'


const RAD = 15;
const PADDLE_W = 10;
const PADDLE_H = 80;
const PADDLE_X = [20 , 680];

const Canvas__foreground = (props) => {
  const CANV_W = props.width;
  const CANV_H = props.height;
  const canvasRef = useRef(null);
  const [pos_info, setPosInfo] = useState({
      pos: [CANV_W / 2,  CANV_H / 2], 
      vel: [0, 0],
      player: [CANV_H / 2, CANV_H / 2],
      time: 0
  });  
  
  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    props.socket.on("update", (all_game_info) => {
      console.log("update", all_game_info)
      setPosInfo(all_game_info);
      props.socket.off("update");
    })
    
    draw_all(context, pos_info);
  }, [pos_info])

  
  return ( 
    <>
      <div className='Game_footer'> </div>
      <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/>
    </>
  );
}


// 지금은 모든 것을 한 번에 그린다. 나중엔 분리해도 될 듯
const draw_all = (ctx, all_game_info) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  
  const center = all_game_info.pos;
  const paddle_y = all_game_info.player;
  draw_ball(ctx, all_game_info.pos, RAD);
  draw_paddle(ctx, [PADDLE_X[0], paddle_y[0]]);
  draw_paddle(ctx, [PADDLE_X[1], paddle_y[1]]);
}

function draw_ball( ctx, center ) {
  ctx.fillStyle = 'orange'
  ctx.beginPath()
  ctx.ellipse(center[0], center[1], RAD, RAD, 0, 0, 2*Math.PI);
  ctx.fill()
}

function draw_paddle( ctx, center ) {
  const paddle_margin = 20;
  const ltx = center[0] - PADDLE_W / 2;
  const lty = center[1] - PADDLE_H / 2;
  ctx.fillStyle = 'orange'
  ctx.beginPath()
  ctx.fillRect(ltx, lty, PADDLE_W, PADDLE_H);
  ctx.fill()
}

export default Canvas__foreground