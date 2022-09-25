import React, { useState } from "react";
import './style.css'
 function Tree() {
  const [inpArray,setInpArray]=useState(String)
  const [levelView,setLevelView] = useState(true)

 
  

      
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

    // COMMON FOR EDGELIST AND LEVEL ORDER
    function place(vertex,level){
        if(vertex!=vertex || vertex==null || !(vertex in adj))return 
        pos[adj[vertex][0]]=[pos[vertex][0]-dx/(level*nodeSpace),pos[vertex][1]+dy];
        pos[adj[vertex][1]]=[pos[vertex][0]+dx/(level*nodeSpace),pos[vertex][1]+dy];
        place(adj[vertex][0],level*2)
        place(adj[vertex][1],level*2)
        
    }

    // LOGIC FOR EDGE LIST FORMING ADJACENY LIST
    function startadj(x){
        let y=x.split('],[')
        y.forEach(element => {
            levelOrder.push(element.split(',').map(Number))
        });
        n=levelOrder.length+1
        canvasSetter(n>63?2:1);
        if(n>3){nodeSpace=1.5;}
        if (n>7){nodeSpace=1;}
        if(n>15){nodeSpace=0.95;}
        if(n>31){nodeSpace=0.85;}
        if(n>63){nodeSpace=0.5;dx=350}
        root=1
        nodes.push(root)
        console.log(levelOrder,y)
        levelOrder.forEach((ver,i) => {
          
          nodes.push(ver[1])

            if(ver[0] in adj)
              adj[ver[0]].push(ver[1])
            else
              adj[ver[0]]=[ver[1]]

        });
        console.log(adj,nodes,levelOrder)
        pos[root]=[width/(n>63?1:2),75]
        place(root,1);
        

        console.log(pos)
        drawadj()
    }
  
    // DRAWING FOR ADJANCEY LIST BY EDGE LIST
    function drawadj(){
      nodes.forEach(i=>{
        let wd= ctx.measureText(i).width;
        ctx.beginPath();
        ctx.arc(pos[i][0], pos[i][1], r, 0, 2 * Math.PI);
        ctx.fillStyle = "#a6a6a6";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = '16px arial';
        ctx.fillText(i, pos[i][0]-wd/2, pos[i][1]+6);
        ctx.stroke();
    })

    nodes.forEach(i=>{
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle="#664400"
        if(i in adj && adj[i].length==2){
            ctx.moveTo(pos[i][0]-r/2-deltaX, pos[i][1]+r/2+deltaY);
            ctx.lineTo(pos[adj[i][0]][0]+r/2+deltaX, pos[adj[i][0]][1]-r/2-deltaY);
            ctx.moveTo(pos[i][0]+r/2+deltaX, pos[i][1]+r/2+deltaY);
            ctx.lineTo(pos[adj[i][1]][0]-r/2-deltaX, pos[adj[i][0]][1]-r/2-deltaY);
        }
        if(i in adj && adj[i].length==1){
          ctx.moveTo(pos[i][0]-r/2-deltaX, pos[i][1]+r/2+deltaY);
          ctx.lineTo(pos[adj[i][0]][0]+r/2+deltaX, pos[adj[i][0]][1]-r/2-deltaY);
          
        }
        ctx.stroke();
    })
    }

    // LOGIC FOR LEVEL ORDER LIST FORMING ADJACENY LIST
    function start(){
      levelOrder=inpArray.split(',').map(Number)
      console.log(levelOrder,nodes)
      n=levelOrder.length
      canvasSetter(n>63?2:1);
      
      
      if(n>3){nodeSpace=1.5;}
      if (n>7){nodeSpace=1;}
      if(n>15){nodeSpace=0.95;}
      if(n>31){nodeSpace=0.85;}
      if(n>63){nodeSpace=0.5;dx=350}
      // if(n>127){nodeSpace=0.5;dx=350;dy=100}
      let prevNull=0,left,right
      levelOrder.forEach((ele,i)=>{
        if(ele==ele)
          nodes.push(i)
      })
      for(let i=0;i<n;i++){
        if(levelOrder[i]==levelOrder[i]){
          
          left=2*i+1-prevNull*2
          if (left>=n) break
          adj[i]=[left]
          right=2*i+2-prevNull*2
          if(right>=n) break
          adj[i].push(right)
          
        }
        else prevNull+=1
      }
      
      console.log(adj)
      root=0
      pos[root]=[width/(n>63?1:2),75]
      place(root,1);

      console.log(pos)
      draw()
    }

    // DRAWING FOR ADJANCEY LIST BY LEVEL ORDER LIST
    function draw() {
        console.log(levelOrder,nodes,adj)
        nodes.forEach(i=>{

            let wd= ctx.measureText(levelOrder[i]).width;
            ctx.beginPath();
            ctx.arc(pos[i][0], pos[i][1], r, 0, 2 * Math.PI);
            ctx.fillStyle = "#a6a6a6";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = '19px arial';
            ctx.fillText(levelOrder[i], pos[i][0]-wd/2, pos[i][1]+6);
            ctx.stroke();
        })
        
        nodes.forEach(i=>{
            ctx.beginPath();
            if(adj[i].length==2){
                if(levelOrder[adj[i][0]]=levelOrder[adj[i][0]]){
                  ctx.moveTo(pos[i][0]-r/2-deltaX, pos[i][1]+r/2+deltaY);
                  ctx.lineTo(pos[adj[i][0]][0]+r/2+deltaX, pos[adj[i][0]][1]-r/2-deltaY);
                }
                if(levelOrder[adj[i][1]]=levelOrder[adj[i][1]]){
                  ctx.moveTo(pos[i][0]+r/2+deltaX, pos[i][1]+r/2+deltaY);
                  ctx.lineTo(pos[adj[i][1]][0]-r/2-deltaX, pos[adj[i][0]][1]-r/2-deltaY);
                }
            }
            if(adj[i].length==1){
              ctx.moveTo(pos[i][0]-r/2-deltaX, pos[i][1]+r/2+deltaY);
              ctx.lineTo(pos[adj[i][0]][0]+r/2+deltaX, pos[adj[i][0]][1]-r/2-deltaY);
              
            }
            ctx.stroke();
        })

    
    }
    try{
      if(levelView)
        start()
      else
        startadj(inpArray)
    }
    catch(e){}
    
  }, [inpArray,levelView]);
  

    function realtime(e){
      let s=e.target.value
      if(levelView)
        setInpArray(s.substring(1,s.length-1))
      else
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
          className="subA" 
          onClick={()=> setLevelView(false)} 
          style={{backgroundColor: levelView? "white":"#cecece"}}
        
        >
          EdgeList
        </button>
        <button  
          className="subL" 
          onClick={()=>{ setLevelView(true) ;console.log(levelView)}}
          style={{backgroundColor: levelView?"#cecece":"white "}}
          >
          LevelOrder
        </button>
        <input 
          type="text" 
          onChange={e=>realtime(e)}
          placeholder={"example: "+`${levelView?"[3,9,20,null,null,15,7]":"[[1,2],[2,3]]"}`}
          />
      
      </div>
      
      
    </div>
  );
}

export default Tree