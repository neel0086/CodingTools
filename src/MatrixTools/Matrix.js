import React, { useState } from "react";
import './style.css'
 function Matrix() {
  const [inpArray,setInpArray]=useState(String)

  let nodes=[],levelOrder=[], adj={}, pos={}
  let n,root;

  React.useEffect(() => {
    let canvas = document.querySelector('#draw');
    let ctx = canvas.getContext('2d')
    let width,height,r=20,deltaX=r/2,deltaY=-r/4,dx=300,dy=70,nodeSpace=2.5


    let canvaOut=document.querySelector(".canvaOuter")
    console.log(canvaOut)
    window.addEventListener('load',start);
    window.addEventListener('resize',canvasSetter);


    function canvasSetter(flag){
        width = window.innerWidth*0.95
        height = window.innerHeight*0.8
        canvas.width = flag*width
        canvas.height = flag*height
        canvaOut.style.width=width+"px"
        canvaOut.style.height=height+"px"
        canvaOut.scrollTo(width/flag, 0);
    } 

    function place(vertex,level){
        
    }

    

    // LOGIC FOR LEVEL ORDER LIST FORMING ADJACENY LIST
    function start(){
      canvasSetter(1)
      draw()
    }

    // DRAWING FOR ADJANCEY LIST BY LEVEL ORDER LIST
    function draw() {
        

    
    }
    try{
        start()
    }
    catch(e){}
    
  }, [inpArray]);
  

    function realtime(e){
      let s=e.target.value
      setInpArray(s.substring(2,s.length-2))
    }

  return (
    <div className="container">
      <div className="canvaOuter">
        <canvas id='draw' >
        </canvas>
      </div>
      <div className="screen">
        <button  
          className="subL" 
          >
          Matrix
        </button>
        <input 
          type="text" 
          onChange={e=>realtime(e)}
          
          />
      
      </div>
      
      
    </div>
  );
}

export default Matrix