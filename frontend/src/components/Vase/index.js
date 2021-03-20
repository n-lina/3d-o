import React, { useRef, useState, useMemo, useEffect} from "react";
import {useFrame} from "react-three-fiber";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";
// import temp from "../../assets/tempp.png";

const Vase = (props) => {
    const {vase} = props
    const texture = useMemo(() => new THREE.TextureLoader().load(grid), []);
    // texture.wrapS = THREE.MirroredRepeatWrapping;
    // texture.wrapT = THREE.MirroredRepeatWrapping;
    // texture.repeat.set(2, 2.6);

    const s_dtop_h = vase.scale_h/2
    const s_dbottom_h = -1 * s_dtop_h
    const scale_factor = vase.scale_h/vase.height

    const s_dtop = Math.max(1,vase.dtop * scale_factor)
    const s_dbottom = Math.max(1,vase.dbottom * scale_factor)

    const s_d1 = Math.max(1, vase.d1 * scale_factor)
    const s_d1_h = (vase.d1_h/100) * vase.scale_h - s_dtop_h

    const s_d2 = Math.max(1, vase.d2 * scale_factor)
    const s_d2_h = (vase.d2_h/100) * vase.scale_h - s_dtop_h

    const s_d3 = Math.max(1,vase.d3 * scale_factor)
    const s_d3_h = (vase.d3_h/100) * vase.scale_h - s_dtop_h

    let top_rim_mesh = <mesh/>
    let bottom_rim_mesh = <mesh />
    let flat_bottom_mesh = <mesh />

    function getInputMarker(rad, height){
        return (
            <mesh position = {[0,height,0]}>
                <cylinderGeometry args={[rad, rad, 0.25, 40, 1, true,0, Math.PI * 2]}/>
                <meshPhongMaterial color="red" />
            </mesh>
        )
    }

    const dtop_marker = vase.top_rim ? getInputMarker((s_dtop/2) + 0.6, s_dtop_h) : getInputMarker((s_dtop/2) + 0.1, s_dtop_h) 
    const dbottom_marker = vase.bottom_rim ? getInputMarker((s_dbottom/2) + 0.6, s_dbottom_h) : getInputMarker((s_dbottom/2) + 0.1, s_dbottom_h)
    const d1_marker = getInputMarker((s_d1/2) + 0.1, s_d1_h)
    const d2_marker = getInputMarker((s_d2/2) + 0.1, s_d2_h)
    const d3_marker = getInputMarker((s_d3/2) + 0.1, s_d3_h)

    if (vase.top_rim){
        top_rim_mesh = <mesh position = {[0,s_dtop_h+0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dtop/2)+0.1,0.3,10,50]}/>
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }
    if (vase.bottom_rim){
        bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dbottom/2)+0.1, 0.3, 10, 50]}/>
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }

    const points = vase.updateCurvedPts()

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);
    let [dist,changeDist] = useState(0);

    if (vase.flat_bottom){
        flat_bottom_mesh = <mesh position = {[0,s_dbottom_h,0]}>
            <cylinderGeometry args={[s_dbottom/2, s_dbottom/2, 0.8, 32]}/>
            <meshPhongMaterial  map={texture} />
        </mesh>
    }

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
                <meshPhongMaterial map = {texture}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh>
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture}  side = {THREE.BackSide} />
            </mesh>
            {vase.top_rim && top_rim_mesh}
            {vase.bottom_rim && bottom_rim_mesh}
            {vase.flat_bottom && flat_bottom_mesh}
            {dbottom_marker}
            {d1_marker}
            {d2_marker}
            {d3_marker}
            {dtop_marker}
        </group>
    )
  }

export default observer(Vase);