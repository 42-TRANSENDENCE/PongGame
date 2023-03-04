import '../../styles/Game/GamePlay.css'
import {useEffect, useRef} from 'react'

interface CanvasProps {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  padding: number;
  color: string
}

interface ScoreProps {
  p1 : number;
  p2 : number;
}

const Canvas__background = (props : any) : JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const W : number = props.width;
  const H : number = props.height;
  const P : number = H / 10;
  const color : string = props.color;

  useEffect( () => {
    console.log("background draw")
    const canvas : any = canvasRef.current;
    const context : CanvasRenderingContext2D = canvas.getContext('2d');
    const canv : CanvasProps = {
      context : context,
      width  : W,
      height : H,
      padding: P,
      color : color
    }
    props.socket.on("update_score", (score : ScoreProps) => {
      draw_score(canv, score);
    });
    draw_table(canv);
    draw_score(canv, {p1:0, p2:0});
    props.socket.on("game_over", (winner : string) => {
      const isWin = props.socket.id === winner;
      setTimeout( () => {
        draw_message(canv, (isWin)?("You Win :)"):("You Lose :("));
      }, 300)
    })

    return () => {
      props.socket.off("update_score")
    }
  }, [color]);

  return ( 
    <canvas ref={canvasRef} width={W} height={H}/>
  );
}

export default Canvas__background;

/*=============================================*/
/*                                             */
/*                  functions                  */
/*                                             */
/*=============================================*/
                        
function draw_table (
  canv : CanvasProps
) : void {
  const context = canv.context;
  const W = canv.width;
  const H = canv.height;
  const P = canv.padding;
  const color = canv.color;

  context.fillStyle = '#333333';
  context.fillRect(0, 0, W, H);

  context.beginPath();
  context.setLineDash([H / 42]);
  context.lineWidth = P / 25;
  context.strokeStyle = color;
  context.moveTo(P, P);
  context.lineTo(W - P, P);
  context.lineTo(W - P, H - P);
  context.lineTo(P, H - P);
  context.lineTo(P, P);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.setLineDash([H / 83]);
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.moveTo(W / 2, 0);
  context.lineTo(W / 2, H);
  context.stroke();
  context.setLineDash([]);
  context.font = "320px Arial";
  context.textBaseline = "middle"
  context.textAlign = "center"
  context.strokeStyle = "wheat"
  context.strokeText(`:`, W / 2 , H * 0.5)
};

function draw_score(
  canv : CanvasProps,
  scores : ScoreProps
) : void {
  const context = canv.context;
  const W = canv.width;
  const H = canv.height;
  const P = canv.padding;

  context.fillStyle = '#333333';
  context.fillRect(P*3    , P * 3, W/2 - 4*P, H - 6*P);
  context.fillRect(W/2 + P, P * 3, W/2 - 4*P, H - 6*P);
  context.fillStyle = "grey";
  context.font = "300px Arial";
  context.strokeStyle = ""
  context.strokeText(`${scores.p1}    ${scores.p2}`, W / 2 , H * 0.52)
  context.fillText(`${scores.p1}    ${scores.p2}`, W / 2 , H * 0.52)
}

function draw_message (
  canv : CanvasProps,
  message : string,
) : void {
  const context = canv.context;
  const W = canv.width;
  const H = canv.height;
  const P = canv.padding;

  context.fillStyle = "grey";
  context.font = "200px Arial";
  context.textBaseline = "bottom"
  context.fillText(`${message}`, W / 2 , H * 0.3)
}