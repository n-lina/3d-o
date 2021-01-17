import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";

const Figurine = (props) => {
    const {figStore} = props
    const texture = useMemo(() => new THREE.TextureLoader().load(grid), []);

    const s_diameter = figStore.diameter 
    const s_diameter_h = 0

    function getInputMarker(rad, height){
        return (
            <mesh position = {[0,height,0]}>
                <cylinderGeometry args={[rad, rad, 0.25, 40, 1, true,0, Math.PI * 2]}/>
                <meshPhongMaterial color="red" />
            </mesh>
        )
    }

    const theta_len = 0.8
    const goal_rad = (figStore.diameter * figStore.body_scale)/2
    const head_rad = goal_rad/Math.sin((1-theta_len) * Math.PI)
    const offset = head_rad*Math.cos((1-theta_len) * Math.PI) - 0.2

    const head =
    <group>
        <mesh position={[0,(figStore.diameter * figStore.body_height) + offset,0]}>
            <sphereGeometry args={[head_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI * theta_len]}/>
            <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh position={[0,(figStore.diameter * figStore.body_height) + offset,0]}>
            <sphereGeometry args={[head_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI * theta_len]}/>
            <meshPhongMaterial map = {texture}  side={THREE.BackSide}/>
        </mesh>
    </group>

    let bunny_ears = <mesh/>
    let cat_ears = <mesh/> 
    let sphere_ears = <mesh/>
    let bear_ears = <mesh/>

    if(figStore.ears == "bear"){
        bear_ears = <mesh/>
    }

    if(figStore.ears == "cat"){
        cat_ears = <mesh/>
    }

    if(figStore.ears == "bunny"){
        bunny_ears = <mesh/>
    }

    if(figStore.ears == "sphere"){
        const ear_rad = head_rad/3.5
        const y_pos = (figStore.diameter * figStore.body_height) + offset + ear_rad + (head_rad * Math.cos(Math.PI/4))
        sphere_ears = 
        <group>
            <mesh position={[-(head_rad * Math.cos(Math.PI/4)),y_pos,0]} rotation={[0,0,Math.PI/4]}>
                <sphereGeometry args={[ear_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI ]}/>
                <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh position={[(head_rad * Math.cos(Math.PI/4)),y_pos,0]} rotation={[0,0,-Math.PI/4]}>
                <sphereGeometry args={[ear_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI ]}/>
                <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
        </group>
    }

    const diameter_marker = getInputMarker((s_diameter/2) + 0.1, s_diameter_h)

    const points = figStore.updateCurvedPts()

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
            <mesh >
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh>
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture}  side = {THREE.BackSide} />
            </mesh>
            {head}
            {diameter_marker}
            {figStore.ears == "bear" && bear_ears}
            {figStore.ears == "bunny" && bunny_ears}
            {figStore.ears == "cat" && cat_ears}
            {figStore.ears == "sphere" && sphere_ears}
        </group>
    )
  }

export default observer(Figurine);