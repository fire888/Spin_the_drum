import './App.css';
import pirat from './image/pirats.jpg'
import React,{useReducer,useRef} from "react";
import { Stage, Sprite, Container, useTick} from '@inlet/react-pixi';



let timer = 0,y=[];

for(let i = 0;i<10;i++){//задаем количество изображений в пуле
  y.push(i)
}


const changeState =()=>{
  if(timer === 0 ){
    timer = 1000//любое не нулевое значение
    setTimeout(()=>{timer = 0},1000)//время кручения барабана
    //можно добавить случайность сделав время рандомом в определённом диапазоне
  }

}


const reducer = (_, { data }) => data

const Image =(props)=>{
   const [motion, update] = useReducer(reducer)
    const iter = useRef(props.y*200)//указание начальной точки каждого изображения
    useTick(delta => {
      
      if(iter.current >= 2000){//возврат картинки наверх
        iter.current=iter.current-2000
      }
      let i= iter.current
      if(timer>0){
       i = (iter.current += 50)//скорость прокрутки
      
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
    image ={pirat}//в зависимости от y можно использовать разные изображения 
    anchor={0.5}
    scale={{ x: 1, y: 1 }}//редактировать размер изображения
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