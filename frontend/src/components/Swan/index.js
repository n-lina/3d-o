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
    <torusGeometry args={[(swanStore.diameter * swanStore.bottom_scale/2)+0.1, swanStore.diameter/60, 10, 50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>

    function getX(angle, radius){
        return  radius * Math.cos(angle)
    }

    function getY(angle, radius){
        return radius * Math.sin(angle)
    }

    const bottomRad = swanStore.diameter * swanStore.top_scale * 0.5
    const midRad = swanStore.diameter * swanStore.top_scale * 0.5 * 0.77
    const midHeight = swanStore.diameter * swanStore.height_scale * 1.7 * 0.5
    const topHeight = swanStore.diameter * swanStore.height_scale * 1.7

    const vertices = []
    vertices.push(
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
        [bottomRad/5, topHeight, 0]  // 18
    );

    const back_vertices = []
    back_vertices.push(
        // bottom row
        [-getX(Math.PI/2.8, bottomRad), 0, getY(Math.PI/2.8, bottomRad)],  // 0
        [-getX(Math.PI/2.4, bottomRad), 0, getY(Math.PI/2.4, bottomRad)],  // 1
        [getX(Math.PI/2, bottomRad), 0, getY(Math.PI/2, bottomRad)],  // 2
        [getX(Math.PI/2.4, bottomRad), 0, getY(Math.PI/2.4, bottomRad)],  // 3
        [getX(Math.PI/2.8, bottomRad), 0, getY(Math.PI/2.8, bottomRad)],  // 4
        // middle row
        [-getX(Math.PI/2.8, midRad), midHeight/3, getY(Math.PI/2.8, midRad)],  // 5
        [-getX(Math.PI/2.4, midRad), midHeight/3, getY(Math.PI/2.4, midRad)],  // 6
        [getX(Math.PI/2, midRad), midHeight/3, getY(Math.PI/2, midRad)],  // 7
        [getX(Math.PI/2.4, midRad), midHeight/3, getY(Math.PI/2.4, midRad)],  // 8
        [getX(Math.PI/2.8, midRad), midHeight/3, getY(Math.PI/2.8, midRad)],  // 9
        // heights
        [bottomRad/5, topHeight/3, 0]  // 10
    );

    const L_vertices = []
    for (let i = 0; i < vertices.length; i++){
        let temp = []
        temp.push(-1 * vertices[i][0],vertices[i][1],vertices[i][2])
        L_vertices.push(temp)
    }

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
    </group>


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
            {diameter_marker}
            {swanStore.rim && rim_mesh}
        </group>
    )
  }

export default observer(Swan);