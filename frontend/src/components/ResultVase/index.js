import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";
import {useUpdate} from "react-three-fiber"


const ResultVase = (props) => {
    const {vaseStore} = props
    // const mesh = useRef();

    const texture = useMemo(() => new THREE.TextureLoader().load(grid), []);
    // const textureTop = useMemo(() => new THREE.TextureLoader().load(grid), []);
    // const texture2 = useMemo(() => new THREE.TextureLoader().load(grid), []);
    // const texture1 = useMemo(() => new THREE.TextureLoader().load(grid), []);
    // const textureBottom = useMemo(() => new THREE.TextureLoader().load(grid), []);

    let refTop = useRef()
    let refTop2 = useRef() 
    let ref2 = useRef()
    let ref22 = useRef()
    let ref1 = useRef() 
    let ref12 = useRef() 
    let refBot = useRef() 
    let refBot2 = useRef() 

    useEffect(() => {
        refTop.current.map = new THREE.TextureLoader().load(vaseStore.textures[0])
        refTop2.current.map = new THREE.TextureLoader().load(vaseStore.textures[0])
        ref2.current.map = new THREE.TextureLoader().load(vaseStore.textures[1])
        ref22.current.map = new THREE.TextureLoader().load(vaseStore.textures[1])
        ref1.current.map = new THREE.TextureLoader().load(vaseStore.textures[2])
        ref12.current.map = new THREE.TextureLoader().load(vaseStore.textures[2])
        refBot.current.map = new THREE.TextureLoader().load(vaseStore.textures[3])
        refBot2.current.map = new THREE.TextureLoader().load(vaseStore.textures[3])
        // console.log(refTop.current)
        
    }, [vaseStore.textures[3]])

    // not working - its not picking up the new texture changes, need a useEffect with a boolean? look into useMEmo

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
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }
    if (vaseStore.bottom_rim){
        bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dbottom/2)+0.1, 0.4, 10, 50]}/>
        <meshPhongMaterial color="#FF7E98" />
        </mesh>
    }

    const points = vaseStore.updateCurvedPts(true)
    const topPts = points[3]
    const pts2 = points[2]
    const pts1 = points[1]
    const bottomPts = points[0]

    const topVase = 
    <group>
        <mesh >
            <latheGeometry args={[topPts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={refTop}  color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[topPts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={refTop2}  color="pink" side = {THREE.BackSide} />
        </mesh>
    </group>

    const pts2Vase = 
    <group>
        <mesh >
            <latheGeometry args={[pts2, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={ref2}   color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[pts2, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={ref22} color="pink" side = {THREE.BackSide} />
        </mesh>
    </group>

    const pts1Vase = 
    <group>
        <mesh >
            <latheGeometry args={[pts1, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={ref1} color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[pts1, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={ref12}  color="pink" side = {THREE.BackSide} />
        </mesh>
    </group>

    const bottomVase = 
    <group>
        <mesh >
            <latheGeometry args={[bottomPts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={refBot} color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[bottomPts, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial ref={refBot2} color="pink" side = {THREE.BackSide} />
        </mesh>
    </group>

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);
    let [dist,changeDist] = useState(0);

    if (vaseStore.bottom_disk){
        bottom_disk_mesh = <mesh position = {[0,s_dbottom_h,0]}>
            <cylinderGeometry args={[s_dbottom/2, s_dbottom/2, 0.8, 32]}/>
            <meshPhongMaterial color="pink" map={texture} />
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
            {topVase}
            {pts2Vase}
            {pts1Vase}
            {bottomVase}
            {vaseStore.top_rim && top_rim_mesh}
            {vaseStore.bottom_rim && bottom_rim_mesh}
            {/* {vaseStore.bottom_disk && bottom_disk_mesh} */}
        </group>
    )
  }

export default observer(ResultVase);