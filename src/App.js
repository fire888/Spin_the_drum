import './App.css';
import pirat from './image/pirats.jpg'
import React,{useReducer,useRef} from "react";
import { Stage, Sprite, Container, useTick} from '@inlet/react-pixi';


// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }

// const images = importAll(require.context('./image', false, /\.(png|jpe?g|svg)$/));



let timer = 0,y=[];

for(let i = 0;i<10;i++){
  y.push(i)
}

console.log(y);

const changeState =()=>{
  if(timer === 0 ){
    timer = 1000
    setTimeout(()=>{timer = 0},2000)
  }

}



const reducer = (_, { data }) => data
const Image =(props)=>{
   const [motion, update] = useReducer(reducer)
    const iter = useRef(props.y*200)
    useTick(delta => {
      
      if(iter.current >= 2000){
        iter.current=0
      }
      let i= iter.current
      if(timer>0){
       i = (iter.current += 50)
      
      }
       update({
        type: 'update',
        data: {
          x: 0,
          y: i,
        }
      })
    })
  return(
    <Sprite 
    image ={pirat}
    anchor={0.5}
    scale={{ x: 1, y: 1 }}
     {...motion}
    />
  )
}


const App=()=> {
  return (
    <div className="drum">
      <Stage className = 'gameScene' width={600} height={800} options={{ backgroundAlpha: 0 }}>
        <Container x={300} y={-200}>
          {y.map((item)=>{ return(<Image key ={item} y={item} />) })}
        </Container>
      </Stage>
      <button className="btn" onClick={changeState}>GO</button>
    </div>
  );
}

export default App;
