import React, { useRef, useState, useMemo, useEffect, createRef} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";
import {useUpdate} from "react-three-fiber"


const ResultVase = (props) => {
    const {vaseStore} = props
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, vaseStore.modelDimensions.length);
     }, []);

    useEffect(() => {
        const len = vaseStore.modelDimensions.length
        for(let i = 0; i < len; i += 1){
            itemsRef.current[i].map = new THREE.TextureLoader().load(vaseStore.textures[len-i-1])
            // console.log(vaseStore.textures[len-i-1])
        }
    }, [])


    const s_dtop_h = vaseStore.scale_h/2
    const s_dbottom_h = -1 * s_dtop_h
    const scale_factor = vaseStore.scale_h/vaseStore.height

    const s_dtop = vaseStore.dtop * scale_factor
    const s_dbottom = vaseStore.dbottom * scale_factor

    let top_rim_mesh = <mesh/>
    let bottom_rim_mesh = <mesh />
    let bottom_disk_mesh = <mesh />

    if (vaseStore.top_rim){
        top_rim_mesh = <mesh position = {[0,s_dtop_h+0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dtop/2)+0.1,0.4,10,50]}/>
        <meshPhongMaterial color={vaseStore.default_color} />
        </mesh>
    }
    if (vaseStore.bottom_rim){
        bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dbottom/2)+0.1, 0.4, 10, 50]}/>
        <meshPhongMaterial color={vaseStore.default_color} />
        </mesh>
    }

    const points = useMemo(() => vaseStore.updateCurvedPts(true), [vaseStore.cm]);

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);
    let [dist,changeDist] = useState(0);

    if (vaseStore.bottom_disk){
        bottom_disk_mesh = <mesh position = {[0,s_dbottom_h,0]}>
            <cylinderGeometry args={[s_dbottom/2, s_dbottom/2, 0.8, 32]}/>
            <meshPhongMaterial color={vaseStore.default_color} />
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
            {points.map((_, i) => (
            <group key={i}>
                <mesh >
                    <latheGeometry args={[points[i], 30, 0, 2*Math.PI]}/>
                    <meshPhongMaterial ref={el => itemsRef.current[i] = el} opacity={1} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
                </mesh>
                <mesh>
                    <latheGeometry args={[points[i], 30, 0, 2*Math.PI]}/>
                    <meshLambertMaterial color={vaseStore.default_color} side = {THREE.BackSide} />
                </mesh>
            </group>   
            ))}
            {vaseStore.top_rim && top_rim_mesh}
            {vaseStore.bottom_rim && bottom_rim_mesh}
            {vaseStore.bottom_disk && bottom_disk_mesh}
        </group>
    )
  }

export default observer(ResultVase);