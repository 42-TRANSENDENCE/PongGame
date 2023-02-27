import './Game.css'
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
    const canvas : any = canvasRef.current;
    const context : CanvasRenderingContext2D = canvas.getContext('2d');
    props.socket.on("update_score", (score : Array<number>) => {
      draw_score({context: context, width: W, height: H, padding: P, color: color}, {p1:score[0], p2:score[1]});
    });
    draw_table({context: context, width: W, height: H, padding: P, color: color});
    draw_score({context: context, width: W, height: H, padding: P, color: color}, {p1:0, p2:0})
    return () => {
      props.socket.off("update_score")
    }
  }, []);

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
                        
const draw_table = ( {context, width, height, padding, color} : CanvasProps ) => {
  const W = width;
  const H = height;
  const P = padding;
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

function draw_score({context, width, height, padding} : CanvasProps, scores : ScoreProps) {
  const W = width;
  const H = height;
  const P = padding;
  context.fillStyle = '#333333';
  context.fillRect(P*3    , P * 3, W/2 - 4*P, H - 6*P);
  context.fillRect(W/2 + P, P * 3, W/2 - 4*P, H - 6*P);
  context.fillStyle = "grey";
  context.font = "300px Arial";
  context.strokeStyle = ""
  context.strokeText(`${scores.p1}    ${scores.p2}`, W / 2 , H * 0.52)
  context.fillText(`${scores.p1}    ${scores.p2}`, W / 2 , H * 0.52)
}