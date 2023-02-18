import React, { useEffect, useRef} from 'react'


const Canvas__foreground = (props) => {
  const socket = props.socket;
  const CANV_RATIO = props.width / 1200;
  
  const CANV_W = props.width;
  const CANV_H = CANV_W * 2 / 3;
  // const RAD = CANV_W / 60;
  const PADDLE_H = CANV_H / 5;
  const PADDLE_W = PADDLE_H / 20;
  const PADDLE_L = PADDLE_W * 5;
  const PADDLE_R = CANV_W - PADDLE_L;

  const canvasRef = useRef(null);
  let game_position_info = {
    ball: [0,0], 
    rad : 30,
    vel: [0, 0],
    paddle: [0, 0],
    score: [0, 0]
  }
  
  useEffect( () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    socket.on("update_ball", (ball, rad, paddle) => {
      redraw_ball (
        context,
        [game_position_info.ball, game_position_info.rad],
        [ball, rad, 'wheat'] );
      redraw_paddle (
        context,
        [PADDLE_L, game_position_info.paddle[0]],
        [PADDLE_L, paddle[0]],
        'red'
      )
      redraw_paddle (
        context,
        [PADDLE_R, game_position_info.paddle[1]],
        [PADDLE_R, paddle[1]],
        'green'
      )
      game_position_info.ball = ball;
      game_position_info.rad = rad;
      game_position_info.paddle = paddle;
    })
    socket.on("game", (data) => { console.log("game??", data); })

    return () => {
      props.socket.off("update_ball");
      props.socket.off("game");
    }
  }, [])

  return ( 
    <>
      <div className='Game_footer'> </div>
      <canvas ref={canvasRef} width={CANV_W} height={CANV_H}/>
    </>
  );

  function redraw_ball( ctx, old_info, new_info ) {
    const old_x = old_info[0][0] * CANV_RATIO + CANV_W / 2;
    const old_y = old_info[0][1] * CANV_RATIO + CANV_H / 2;
    const old_r = old_info[1] * CANV_RATIO + 1;
    const new_x = new_info[0][0] * CANV_RATIO + CANV_W / 2;
    const new_y = new_info[0][1] * CANV_RATIO + CANV_H / 2;
    const new_r = new_info[1] * CANV_RATIO;
    ctx.clearRect(old_x - old_r, old_y - old_r, old_x + old_r, old_y + old_r);
    ctx.fillStyle = new_info[2];
    ctx.beginPath();
    ctx.ellipse(new_x, new_y, new_r, new_r, 0, 0, 2*Math.PI);
    ctx.fill();
  }

  function redraw_paddle(ctx, old_center, new_center, color) {
    // erase old paddle

    const old_x = old_center[0];
    const old_y = old_center[1];
    const old_ltx = old_x - PADDLE_W / 2;
    const old_lty = (old_y * CANV_RATIO + CANV_H / 2 ) - PADDLE_H / 2;
    ctx.clearRect(old_ltx, old_lty, PADDLE_W, PADDLE_H);

    // draw new paddle
    const new_x = new_center[0];
    const new_y = new_center[1];
    const new_ltx = new_x - PADDLE_W / 2;
    const new_lty = (new_y * CANV_RATIO + CANV_H / 2 ) - PADDLE_H / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(new_ltx, new_lty, PADDLE_W, PADDLE_H);
    ctx.fill();
  }
}

export default Canvas__foreground