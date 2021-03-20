import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";

const ResultBasket = (props) => {
    const {basketStore} = props
    const itemsRef = useRef([]);
    const insideRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, basketStore.modelDimensions.length);
        insideRef.current = insideRef.current.slice(0, basketStore.modelDimensions.length);
     }, []);

    useEffect(() => {
        const len = basketStore.modelDimensions.length
        for(let i = 0; i < len; i += 1){
            itemsRef.current[i].map = new THREE.TextureLoader().load(basketStore.textures[len-i-1])
            insideRef.current[i].map = new THREE.TextureLoader().load(basketStore.textures[len-i-1])
            // console.log(basketStore.textures[len-i-1])
        }
    }, [])

    const s_dtop_h = basketStore.scale_h/2
    const s_dbottom_h = -1 * s_dtop_h
    const scale_factor = basketStore.scale_h/basketStore.height

    const s_dtop = Math.max(1,basketStore.dtop * scale_factor)
    const s_dbottom = Math.max(1,basketStore.dbottom * scale_factor)

    let top_rim_mesh = <mesh/>
    let bottom_rim_mesh = <mesh />
    let handle = <mesh /> // handle options: 1 top, 2 sides, none 
    let lid = <mesh/> // true false
    let side_handles = <mesh/>
    let flat_bottom_mesh = <mesh />
    let curved_bottom = <mesh />

    if (basketStore.top_rim){
        top_rim_mesh = <mesh position = {[0,s_dtop_h+0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dtop/2)+0.15,0.25,10,50]}/>
        <meshPhongMaterial color={basketStore.default_color} />
        </mesh>
    }
    if (basketStore.bottom_rim){
        bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[(s_dbottom/2)+0.15, 0.25, 10, 50]}/>
        <meshPhongMaterial color={basketStore.default_color} />
        </mesh>
    }

    if (basketStore.top_handle){
        const phi_len = Math.PI * 1
        const theta_len = 0.1 * Math.PI
        const theta_start = Math.PI * 0.45

        handle = 
        <group>
            <mesh position={[0,s_dtop_h,0]} rotation={[-Math.PI/2,0,0]}>
                <sphereGeometry args={[s_dtop/2, 20, 10, 0, phi_len, theta_start, theta_len]} />
                <meshPhongMaterial color={basketStore.default_color} side = {THREE.FrontSide} />
            </mesh>
            <mesh position={[0,s_dtop_h,0]}  rotation={[-Math.PI/2,0,0]}>
                <sphereGeometry args={[s_dtop/2, 20, 10, 0, phi_len, theta_start, theta_len]} />
                <meshPhongMaterial color={basketStore.default_color} side = {THREE.BackSide} />
            </mesh>
        </group>
    }

    if (basketStore.flat_bottom){
        flat_bottom_mesh = <mesh position = {[0,s_dbottom_h,0]}>
            <cylinderGeometry args={[s_dbottom/2, s_dbottom/2, 0.8, 32]}/>
            <meshPhongMaterial color={basketStore.default_color} />
        </mesh>
    }

    class CustomCircleCurve extends THREE.Curve {
        constructor(scale) {
          super();
          this.scale = scale;
        }
        getPoint(t) {
          const tx = 0;
          const ty = Math.max(-0.5, Math.sin(2 * Math.PI * t));
          const tz = Math.cos(2 * Math.PI * t);
          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
      }

    if (basketStore.side_handles){
        const tube_scale = s_dtop/5
        const path = new CustomCircleCurve(tube_scale)
        const segs = 40
        const tube_rad = Math.min(0.5, tube_scale/10)
        const rad_segs = 7
        const closed = false

        side_handles =  
        <group>
        <mesh position={[(-s_dtop/2)+(tube_rad*2), s_dtop_h + tube_rad + (0.5*tube_scale), 0]} >
            <tubeGeometry args={[path, segs, tube_rad, rad_segs, closed]} />
            <meshPhongMaterial color={basketStore.default_color} side = {THREE.FrontSide} />
        </mesh>
        <mesh position={[(s_dtop/2)-(tube_rad*2), s_dtop_h + tube_rad + (0.5*tube_scale), 0]}>
            <tubeGeometry args={[path, segs, tube_rad, rad_segs, closed]} />
            <meshPhongMaterial color={basketStore.default_color} side = {THREE.FrontSide} />
        </mesh>
        </group>
    }

    if (basketStore.lid){
        const lid_scale = 1
        const percent_lid = 0.25
        const rad_lid = (s_dtop * lid_scale/2) / Math.sin(Math.PI * percent_lid)
        const lid_dist = s_dtop_h - (s_dtop* lid_scale/2) / Math.tan(Math.PI * percent_lid)
        const deco_r = rad_lid/15
        const deco_dist = lid_dist + rad_lid + deco_r - 0.2

        lid = 
        <group>
            <mesh position={[0,lid_dist+0.1,0]}>
                <sphereGeometry args={[rad_lid, 20, 10, 0, Math.PI * 2, 0, Math.PI * percent_lid]} />
                <meshPhongMaterial color={basketStore.default_color} side = {THREE.FrontSide} />
            </mesh>
            <mesh position={[0,lid_dist,0]}>
                <sphereGeometry args={[rad_lid, 20, 10, 0, Math.PI * 2, 0, Math.PI * percent_lid]} />
                <meshPhongMaterial color={basketStore.default_color} side = {THREE.BackSide} />
            </mesh>
            <mesh position={[0,deco_dist,0]}>
                <sphereGeometry args={[deco_r, 20, 10]} />
                <meshPhongMaterial color={basketStore.default_color} side = {THREE.FrontSide} />
            </mesh>
        </group>
    }

    if (!basketStore.flat_bottom){
        const percent_sphere = 0.2
        const rad_bottom = (s_dbottom/2) / Math.sin(Math.PI * percent_sphere)
        const bottom_dist = s_dbottom_h - (s_dbottom/2) / Math.tan(Math.PI * percent_sphere)

        curved_bottom = <group>
        <mesh position={[0,bottom_dist-0.1,0]}>
            <sphereGeometry args={[rad_bottom, 20, 10, 0, Math.PI * 2, 0, Math.PI * percent_sphere]} />
            <meshPhongMaterial color={basketStore.default_color} side={THREE.FrontSide}/>
        </mesh>
        <mesh position={[0,bottom_dist-0.1,0]}>
            <sphereGeometry args={[rad_bottom, 20, 10, 0, Math.PI * 2, 0, Math.PI * percent_sphere]} />
            <meshPhongMaterial color={basketStore.default_color} side = {THREE.BackSide} />
        </mesh>
        </group>
    }

    // const points = basketStore.updateCurvedPts()
    const points = useMemo(() => basketStore.updateCurvedPts(true), [basketStore.cm]);

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
        <group position={[0,-5,dist]} rotation={[x_rot,y_rot,z_rot]}> 
            <group>
            {points.map((_, i) => (
                <mesh key={i}>
                    <latheGeometry args={[points[i], 30, 0, 2*Math.PI]}/>
                    <meshPhongMaterial ref={el => itemsRef.current[i] = el} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
                </mesh>
            ))}
            {points.map((_, i) => (
                <mesh key={i}>
                    <latheGeometry args={[points[i], 30, 0, 2*Math.PI]}/>
                    <meshPhongMaterial ref={el => insideRef.current[i] = el} side = {THREE.BackSide} />
                </mesh>
            ))}
            </group>   
            {basketStore.lid && lid}
            {basketStore.top_rim && top_rim_mesh}
            {basketStore.bottom_rim && bottom_rim_mesh}
            {basketStore.top_handle && handle}
            {basketStore.side_handles && side_handles}
            {basketStore.flat_bottom && flat_bottom_mesh}
            {!basketStore.flat_bottom && curved_bottom}
        </group>
    )
  }

export default observer(ResultBasket);