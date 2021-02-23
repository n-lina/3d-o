import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";
import Wing from "../Wing"

const Swan = (props) => {
    const {swanStore} = props
    const texture = useMemo(() => new THREE.TextureLoader().load(grid), []);

    function getInputMarker(rad, height){
        return (
            <mesh position = {[0,height,0]}>
                <cylinderGeometry args={[rad, rad, 0.25, 40, 1, true,0, Math.PI * 2]}/>
                <meshPhongMaterial color="red" />
            </mesh>
        )
    }

    const swan_pts = swanStore.swanBodyPts()

    const swan_body = 
    <group>
        <mesh >
            <latheGeometry args={[swan_pts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[swan_pts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial map = {texture}  side = {THREE.BackSide} />
        </mesh>
    </group>

    const bottom = swanStore.diameter * swanStore.height_scale * 0.8 * -1
    const rim_mesh = <mesh position = {[0,bottom-0.1,0]} rotation = {[1.57,0,0]}> 
    <torusGeometry args={[(swanStore.diameter * swanStore.bottom_scale/2)+0.1, swanStore.diameter/70, 10, 50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>

    function getX(angle, radius){
        return  radius * Math.cos(angle)
    }

    function getY(angle, radius){
        return radius * Math.sin(angle)
    }

    const bottomRad = swanStore.diameter * swanStore.top_scale * 0.5
    const midRad = swanStore.diameter * swanStore.top_scale * 0.5 * 0.73
    const midHeight = swanStore.diameter * swanStore.height_scale * 1.7 * 0.5
    const topHeight = swanStore.diameter * swanStore.height_scale * 1.9

    const vertices =
    [
        // bottom row
        [getX(Math.PI/2.8, bottomRad), 0, getY(Math.PI/2.8, bottomRad)],  // 0
        [getX(Math.PI/3.7, bottomRad), 0, getY(Math.PI/3.7, bottomRad)],  // 1
        [getX(Math.PI/6, bottomRad), 0, getY(Math.PI/6, bottomRad)],  // 2
        [getX(Math.PI/12, bottomRad), 0, getY(Math.PI/12, bottomRad)],  // 3
        [getX(0, bottomRad), 0, getY(0, bottomRad)],  // 4
        [getX(Math.PI/12, bottomRad), 0, -getY(Math.PI/12, bottomRad)],  // 5
        [getX(Math.PI/6, bottomRad), 0, -getY(Math.PI/6, bottomRad)],  // 6
        [getX(Math.PI/3.7, bottomRad), 0, -getY(Math.PI/3.7, bottomRad)],  // 7
        [getX(Math.PI/2.8, bottomRad), 0, -getY(Math.PI/2.8, bottomRad)],  // 8
        // middle row
        [getX(Math.PI/2.8, midRad), midHeight, getY(Math.PI/2.8, midRad)],  // 9
        [getX(Math.PI/3.7, midRad), midHeight, getY(Math.PI/3.7, midRad)],  // 10
        [getX(Math.PI/6, midRad), midHeight, getY(Math.PI/6, midRad)],  // 11
        [getX(Math.PI/12, midRad), midHeight, getY(Math.PI/12, midRad)],  // 12
        [getX(0, midRad), midHeight, getY(0, midRad)],  // 13
        [getX(Math.PI/12, midRad), midHeight, -getY(Math.PI/12, midRad)],  // 14
        [getX(Math.PI/6, midRad), midHeight, -getY(Math.PI/6, midRad)],  // 15
        [getX(Math.PI/3.7, midRad), midHeight, -getY(Math.PI/3.7, midRad)],  // 16
        [getX(Math.PI/2.8, midRad), midHeight, -getY(Math.PI/2.8, midRad)],  // 17
        // heights
        [bottomRad/6, topHeight, 0]  // 18
    ];

    const big_vertices = 
    [
        [-getX(-Math.PI/6, bottomRad), 0, -getY(-Math.PI/6, bottomRad)],  // 0
        [-getX(0, bottomRad), 0, -getY(0, bottomRad)],  // 1
        [-getX(Math.PI/8, bottomRad), 0, -getY(Math.PI/8, bottomRad)],  // 2
        [-getX(5*Math.PI/16, bottomRad), 0, -getY(5*Math.PI/16, bottomRad)],  // 3        
        [getX(Math.PI/2, bottomRad), 0, -getY(Math.PI/2, bottomRad)],  // 4
        [getX(5*Math.PI/16, bottomRad), 0, -getY(5*Math.PI/16, bottomRad)],  // 5  
        [getX(Math.PI/8, bottomRad), 0, -getY(Math.PI/8, bottomRad)],  // 6
        [getX(0, bottomRad), 0, -getY(0, bottomRad)],  // 7
        [getX(-Math.PI/6, bottomRad), 0, -getY(-Math.PI/6, bottomRad)],  // 8
        [0, topHeight*1.1, -bottomRad*1.7]  // 9
    ];

    const F_vertices = [
        // bottom row
        [-getX(Math.PI/2.8, bottomRad), 0, getY(Math.PI/2.8, bottomRad)],  // 0
        [-getX(Math.PI/2.4, bottomRad), 0, getY(Math.PI/2.4, bottomRad)],  // 1
        [getX(Math.PI/2, bottomRad), 0, getY(Math.PI/2, bottomRad)],  // 2
        [getX(Math.PI/2.4, bottomRad), 0, getY(Math.PI/2.4, bottomRad)],  // 3
        [getX(Math.PI/2.8, bottomRad), 0, getY(Math.PI/2.8, bottomRad)],  // 4
        [0, topHeight/3, bottomRad/1.3]  // 5
    ];


    const L_vertices = []
    for (let i = 0; i < vertices.length; i++){
        let temp = []
        temp.push(-1 * vertices[i][0],vertices[i][1],vertices[i][2])
        L_vertices.push(temp)
    }

    const B_vertices = []
    for (let i = 0; i < F_vertices.length-1; i++){
        let temp = []
        temp.push(F_vertices[i][0],F_vertices[i][1], -1 * F_vertices[i][2])
        B_vertices.push(temp)
    }
    B_vertices.push([0, topHeight/4, -bottomRad * 1.1])

    const y_pos_wing = swanStore.diameter * swanStore.height_scale
    const wings = 
    <group>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={vertices} purpose={"wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={vertices} purpose={"wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.BackSide} shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={L_vertices} purpose={"wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={L_vertices} purpose={"wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.BackSide} shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={F_vertices} purpose={"front-back"}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={F_vertices} purpose={"front-back"}/>
            <meshPhongMaterial map = {texture} side={THREE.BackSide} shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={B_vertices} purpose={"front-back"}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={B_vertices} purpose={"front-back"}/>
            <meshPhongMaterial map = {texture} side={THREE.BackSide} shininess = {26}/>
        </mesh>
    </group>

    const one_wing = <group>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={big_vertices} purpose={"one-wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,y_pos_wing,0]}>
            <Wing vertices={big_vertices} purpose={"one-wing"}/>
            <meshPhongMaterial map = {texture} side={THREE.BackSide} shininess = {26}/>
        </mesh>
    </group>

    const shape = useMemo( () => new THREE.Shape(), [swanStore.diameter]);
    const param = swanStore.diameter * 0.3
    const t = param * 0.4
    shape.moveTo(0, -param*1.3);
    shape.lineTo(param*0.9, 0)
    shape.quadraticCurveTo(param + param/3, param*1.5/2,param, param * 1.4)
    shape.quadraticCurveTo(param/2, param * 1.9, -param/3,param)
    shape.lineTo(-param/2.5, param - (1.5*t))
    shape.quadraticCurveTo(param/2 , (param * 1.9) - t, param -t/1.5 , (param * 1.5) - t/1.5)
    shape.quadraticCurveTo((param + param/3.5) -t/1.5, (param*1.5/2) + t/1.5, param -t/1.5, t/1.5)
    
    const depth = param/6

    const extrudeSettings = {
        steps: 100,  
        depth: depth,  
        bevelEnabled: false,   
      };
      

    const offset = swanStore.diameter * swanStore.height_scale + (param*1.3) + ((topHeight/3) * 0)
    const neck_mesh = <mesh position={[-depth/2,offset,(bottomRad/1)]} rotation={[0, Math.PI/2, 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]}/>
        <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
    </mesh>


    const diameter_marker = getInputMarker((swanStore.diameter/2) + 0.1, 0)

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);
    let [dist,changeDist] = useState(0);

    const handleKeyDown = (event) => {
        switch(event.key)
        {
            case "x":
                    x_rot = x_rot + 0.1
                    changeXrot(x_rot);
                    break;
            case "y": 
                    y_rot = y_rot + 0.1
                    changeYrot(y_rot);
                    break;
            case "z": 
                    z_rot = z_rot + 0.1
                    changeZrot(z_rot);
                    break;
            case "w": 
                    dist = Math.max(dist - 5,-300)
                    changeDist(dist)
                    break;
            case "q": 
                    dist = Math.min(dist + 5,50)
                    changeDist(dist)
                    break;
            case " ": 
                    event.preventDefault()
                    x_rot = 0
                    y_rot = 0
                    z_rot = 0 
                    dist = 0
                    changeXrot(x_rot)
                    changeYrot(y_rot)
                    changeZrot(z_rot)
                    changeDist(dist)
            default: 
                    break;
        }
    };
    
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <group position={[0,-7,dist]} rotation={[x_rot,y_rot,z_rot]}> 
            {swan_body}
            {wings}
            {/* {one_wing} */}
            {diameter_marker}
            {swanStore.rim && rim_mesh}
            {neck_mesh}
        </group>
    )
  }

export default observer(Swan);