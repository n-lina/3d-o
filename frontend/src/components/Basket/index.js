import React, { useRef, useState, useMemo, useEffect} from "react";
import {useFrame} from "react-three-fiber";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";

const Basket = (props) => {
    const {basketStore} = props
    const texture = useMemo(() => new THREE.TextureLoader().load(grid), []);

    const s_dtop_h = basketStore.scale_h/2
    const s_dbottom_h = -1 * s_dtop_h
    const scale_factor = basketStore.scale_h/basketStore.height

    const s_dtop = basketStore.dtop * scale_factor
    const s_dbottom = basketStore.dbottom * scale_factor

    const s_diameter = basketStore.diameter * scale_factor
    const s_diameter_h = 0

    // need rounded bottom shape , concave

    let top_rim_mesh = <mesh/>
    let bottom_rim_mesh = <mesh />
    let bottom_disk_mesh = <mesh />
    let handle = <mesh /> // handle options: 1 top, 2 sides, none 
    let lid = <mesh/> // true false
    

    if (basketStore.top_rim){
        top_rim_mesh = <mesh position = {[0,s_dtop_h+0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dtop/2)+0.1,0.4,10,50]}/>
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }
    if (basketStore.bottom_rim){
        bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dbottom/2)+0.1, 0.4, 10, 50]}/>
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }

    function getInputMarker(rad, height){
        return (
            <mesh position = {[0,height,0]}>
                <cylinderGeometry args={[rad, rad, 0.25, 40, 1, true,0, Math.PI * 2]}/>
                <meshPhongMaterial color="red" />
            </mesh>
        )
    }

    const dtop_marker = basketStore.top_rim ? getInputMarker((s_dtop/2) + 0.6, s_dtop_h) : getInputMarker((s_dtop/2) + 0.1, s_dtop_h) 
    const dbottom_marker = basketStore.bottom_rim ? getInputMarker((s_dbottom/2) + 0.6, s_dbottom_h) : getInputMarker((s_dbottom/2) + 0.1, s_dbottom_h)
    const diameter_marker = getInputMarker((s_diameter/2) + 0.1, s_diameter_h)

    const points = basketStore.updateCurvedPts()

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
                    dist = Math.max(dist - 5,-550)
                    changeDist(dist)
                    break;
            case "q": 
                    dist = Math.min(dist + 5,40)
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
        <group position={[0,0,dist]} rotation={[x_rot,y_rot,z_rot]}> 
            <mesh >
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture} color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh>
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture} color="pink" side = {THREE.BackSide} />
            </mesh>
            {basketStore.top_rim && top_rim_mesh}
            {basketStore.bottom_rim && bottom_rim_mesh}
            {/* {basketStore.side_handles && side_handles} */}
            {/* {basketStore.top_handle && top_handle} */}
            {/* {basketStore.lid && lid} */}
            {diameter_marker}
            {dtop_marker}
            {dbottom_marker}
        </group>
    )
  }

export default observer(Basket);