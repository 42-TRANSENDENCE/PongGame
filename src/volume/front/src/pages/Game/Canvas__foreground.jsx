import React, { useState, useEffect, useRef} from 'react'



const Canvas__foreground = (props) => {
  const socket = props.socket;
  const CANV_RATIO = props.width / 1200;
  
  const CANV_W = props.width;
  const CANV_H = CANV_W * 2 / 3;
  const RAD = CANV_W / 60;
  const PADDLE_H = CANV_H / 5;
  const PADDLE_W = PADDLE_H / 20;
  const PADDLE_L = PADDLE_W * 5;
  const PADDLE_R = CANV_W - PADDLE_L;


  const canvasRef = useRef(null);
  const [pos_info, setPosInfo] = useState({
    ball: [CANV_W / 2,  CANV_H / 2], 
    rad : RAD,
    vel: [0, 0],
    paddle: [CANV_H / 2, CANV_H / 2],
    score: [0, 0]
  });  
  
  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    props.socket.on("update", (all_pos_info) => {
      setPosInfo(all_pos_info);
      draw_all(context, all_pos_info);
    })

    socket.on("game", (data) => {
      console.log("ganme??", data);
    })
  }, [pos_info])

  function convert_info(info) {
    let new_info = info;
    new_info.ball[0] = info.ball[0] * CANV_RATIO + CANV_W / 2;
    new_info.ball[1] = info.ball[1] * CANV_RATIO + CANV_H / 2;
    new_info.rad    = info.rad    * CANV_RATIO;
    new_info.vel[0] = info.vel[0] * CANV_RATIO;
    new_info.vel[1] = info.vel[1] * CANV_RATIO;
    new_info.paddle[0] = info.paddle[0] * CANV_RATIO + CANV_H / 2;
    new_info.paddle[1] = info.paddle[1] * CANV_RATIO + CANV_H / 2;
    return new_info;
  }

  return ( 
    <>
      <div className='Game_footer'> </div>
      <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/>
    </>
  );


  function draw_all(ctx, all_pos_info) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const center = all_pos_info.ball;
    const radius = all_pos_info.rad;
    draw_ball(ctx, center, radius, 'orange');

    const paddle_y = all_pos_info.paddle;
    draw_paddle(ctx, PADDLE_L, paddle_y[0], 'red');
    draw_paddle(ctx, PADDLE_R, paddle_y[1], 'green');
  }

  function draw_ball( ctx, center, rad, color ) {




    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.ellipse(
                center[0] * CANV_RATIO + CANV_W / 2, 
                center[1] * CANV_RATIO + CANV_H / 2, 
                rad * CANV_RATIO, 
                rad * CANV_RATIO, 
                0, 0, 2*Math.PI);
    ctx.fill()
  }

  function draw_paddle( ctx, x, y, color ) {
    const ltx = x - PADDLE_W / 2;
    const lty = (y * CANV_RATIO + CANV_H / 2 ) - PADDLE_H / 2;
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.fillRect(ltx, lty, PADDLE_W, PADDLE_H);
    ctx.fill()
  }

}

export default Canvas__foreground