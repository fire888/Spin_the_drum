import './App.css';
import pirat from './image/pirats.jpg'
import React,{useReducer,useRef} from "react";
/** /////////////////////////////////////////////////////////////////////////////////////
 * одинарные кавычки, нет точки с запятой, потом двойные кавычки есть точка с запятой  */

import { Stage, Sprite, Container, useTick} from '@inlet/react-pixi';
/** /////////////////////////////////////////////////////////////////////////////////////
 * пробел после скобки и нет пробела перед скобкой  */




let timer = 0,y=[];
/** /////////////////////////////////////////////////////////////////////////////////////
 * в первой части равно с пробелами, во второй части нет пробелов,
 *  переменная 'y' не изменяется - пишем через const
 *  название переменной 'y' неудачное, по поиску невозможно найти будет, где она используется */

for(let i = 0;i<10;i++){//задаем количество изображений в пуле
    y.push(i)
}
/** /////////////////////////////////////////////////////////////////////////////////////
 * пробелы перед и после операторов в одном месте есь в другом нет */



const changeState =()=>{
    if(timer === 0 ){
        timer = 1000//любое не нулевое значение
        setTimeout(()=>{timer = 0},1000)//время кручения барабана
        //можно добавить случайность сделав время рандомом в определённом диапазоне
    }

}


const reducer = (_, { data }) => data
/** /////////////////////////////////////////////////////////////////////////////////////
 * в предыдущем варианте пробелы перед стрелкой отсутствуют, тут есть  */

const Image =(props)=>{
    const [motion, update] = useReducer(reducer)
    /** /////////////////////////////////////////////////////////////////////////////////////
     * неявные названия */
    const iter = useRef(props.y*200)//указание начальной точки каждого изображения
    /** /////////////////////////////////////////////////////////////////////////////////////
     * отступы от левого края поехали */
    useTick(delta => {

        if(iter.current >= 2000){//возврат картинки наверх
            iter.current=iter.current-2000
        }
        let i= iter.current
        if(timer>0){
            i = (iter.current += 50)//скорость прокрутки
            /** /////////////////////////////////////////////////////////////////////////////////////
             * нужно вывести вo внешнюю константу SPEED_Y = 50, будет понятно что скорость без комментария */

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
    /** /////////////////////////////////////////////////////////////////////////////////////
     * табуляция */
}


const App=()=> {
    return (
        <div className="drum">
            <Stage className = 'gameScene' width={600} height={800} options={{ backgroundAlpha: 0 }}>
                <Container x={300} y={-200}>
                    {y.map((item)=><Image key ={item} y={item} />)}
                </Container>
            </Stage>
            <button className="btn" onClick={changeState}>GO</button>
        </div>
    );
}
/** /////////////////////////////////////////////////////////////////////////////////////
 * норм, кроме строчки {y.map((item)=>{ return(<Image key ={item} y={item} />) })}
 * не надо писать лишнее - тяжело читать: {y.map((item)=><Image key ={item} y={item} />)} */

export default App;