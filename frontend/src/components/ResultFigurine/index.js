import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";

const Figurine = (props) => {
    const {figStore} = props
    const itemsRef = useRef([]);
    const insideRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, figStore.modelDimensions.length-1);
        insideRef.current = insideRef.current.slice(0, figStore.modelDimensions.length-1);
     }, []);

    useEffect(() => {
        const len = figStore.modelDimensions.length-1
        for(let i = 0; i < len; i += 1){
            itemsRef.current[i].map = new THREE.TextureLoader().load(figStore.textures[i])
            insideRef.current[i].map = new THREE.TextureLoader().load(figStore.textures[i])
            // console.log(figStore.textures[len-i-1])
        }
    }, [])

    const texture_body = useMemo(() => new THREE.TextureLoader().load(figStore.textures[figStore.textures.length-1]), []) 

    const theta_len = 0.8
    const goal_rad = (figStore.diameter * figStore.body_scale)/2
    const head_rad = goal_rad/Math.sin((1-theta_len) * Math.PI)
    const offset = head_rad*Math.cos((1-theta_len) * Math.PI) - 0.2

    const divs = figStore.getBrokenHeadPts(Math.PI*theta_len)

    const broken_head = 
    <group>
        {divs.map((_, i) => (
            <mesh key={i} position={[0,(figStore.diameter * figStore.body_height) + offset,0]}>
                <sphereGeometry args={[head_rad, 20, 14, 0, 2 * Math.PI, divs[i][0], divs[i][1]]}/>
                <meshPhongMaterial ref={el => itemsRef.current[i] = el} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
        ))}
        {divs.map((_, i) => (
            <mesh key={i} position={[0,(figStore.diameter * figStore.body_height) + offset,0]}>
                <sphereGeometry args={[head_rad, 20, 14, 0, 2 * Math.PI, divs[i][0], divs[i][1]]}/>
                <meshPhongMaterial ref={el => insideRef.current[i] = el} side={THREE.BackSide}/>
            </mesh>
        ))}
    </group>
    
    let bunny_ears = <mesh/>
    let cat_ears = <mesh/> 
    let sphere_ears = <mesh/>
    let bear_ears = <mesh/>
    let arms = <mesh/>

    class CustomCircleCurve extends THREE.Curve {
        constructor(scale) {
          super();
          this.scale = scale;
        }
        getPoint(t) {
          const tx = Math.cos(2 * Math.PI * t);
          const ty = Math.max(-0.5, Math.sin(2 * Math.PI * t));
          const tz = 0;
          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
    }

    if(figStore.ears == "bear"){
        const tube_scale = head_rad/3
        const path = new CustomCircleCurve(tube_scale)
        const segs = 40
        const tube_rad = Math.min(0.5, tube_scale/7)
        const rad_segs = 7
        const closed = false
        const y_pos = (figStore.diameter * figStore.body_height) + offset + tube_scale/4 + (head_rad * Math.cos(Math.PI/4))

        bear_ears =  
        <group>
        <mesh position={[-(head_rad * Math.cos(Math.PI/4) + tube_scale/5),y_pos,0]} rotation={[0,0,Math.PI/4]} >
            <tubeGeometry args={[path, segs, tube_rad, rad_segs, closed]} />
            <meshPhongMaterial color={figStore.default_color} side = {THREE.FrontSide} />
        </mesh>
        <mesh position={[(head_rad * Math.cos(Math.PI/4) + tube_scale/5),y_pos,0]} rotation={[0,0,-Math.PI/4]}>
            <tubeGeometry args={[path, segs, tube_rad, rad_segs, closed]} />
            <meshPhongMaterial  color={figStore.default_color} side = {THREE.FrontSide} />
        </mesh>
        </group>
    }

    if(figStore.ears == "cat"){
        const shape = new THREE.Shape();
        const y_pos = (figStore.diameter * figStore.body_height) + offset + (head_rad * Math.cos(Math.PI/4))
        const half_side_len = (head_rad/1.5)/2
        shape.moveTo(-half_side_len,0);
        shape.quadraticCurveTo(-half_side_len/1.2, half_side_len * 1.3, 0,half_side_len * 1.8);
        shape.quadraticCurveTo(half_side_len/1.2, half_side_len * 1.3, half_side_len,0);
        shape.lineTo(-half_side_len,0);

        const extrudeSettings = {
            steps: 1,  
            depth: 1,  
            bevelEnabled: false,  
          };

        cat_ears = 
        <group>
        <mesh position={[(head_rad * Math.cos(Math.PI/4) - half_side_len/3),y_pos,0]} rotation={[0,0,-Math.PI/4.5]}>
            <extrudeGeometry args={[shape, extrudeSettings]}/>
            <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>        
        </mesh>
        <mesh position={[-(head_rad * Math.cos(Math.PI/4) - half_side_len/3),y_pos,0]} rotation={[0,0,Math.PI/4.5]}>
            <extrudeGeometry args={[shape, extrudeSettings]}/>
            <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>        
        </mesh>
        </group>

    }

    if(figStore.ears == "bunny"){
        const bshape = new THREE.Shape();
        const y_pos = (figStore.diameter * figStore.body_height) + offset + (head_rad * Math.cos(Math.PI/4))
        const half_side_len = (head_rad/2)/2
        bshape.moveTo(-half_side_len,0);
        bshape.lineTo(-half_side_len, half_side_len * 3)
        bshape.quadraticCurveTo(-half_side_len/2, (half_side_len * 4), 0,half_side_len * 4);
        bshape.quadraticCurveTo(half_side_len/2, half_side_len * 4, half_side_len, half_side_len * 3);
        bshape.lineTo(half_side_len,0);

        const extrudeSettings = {
            steps: 1,  
            depth: 1,  
            bevelEnabled: false,  
          };

        bunny_ears = 
        <group>
        <mesh position={[(head_rad * Math.cos(Math.PI/4) - half_side_len/3),y_pos,0]} rotation={[0,0,-Math.PI/4]}>
            <extrudeGeometry args={[bshape, extrudeSettings]}/>
            <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>        
        </mesh>
        <mesh position={[-(head_rad * Math.cos(Math.PI/4) - half_side_len/3),y_pos,0]} rotation={[0,0,Math.PI/4]}>
            <extrudeGeometry args={[bshape, extrudeSettings]}/>
            <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>        
        </mesh>
        </group>
    }

    if(figStore.ears == "sphere"){
        const ear_rad = head_rad/3.5
        const y_pos = (figStore.diameter * figStore.body_height) + offset + ear_rad + (head_rad * Math.cos(Math.PI/4))
        sphere_ears = 
        <group>
            <mesh position={[-(head_rad * Math.cos(Math.PI/4)),y_pos,0]} rotation={[0,0,Math.PI/4]}>
                <sphereGeometry args={[ear_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI ]}/>
                <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh position={[(head_rad * Math.cos(Math.PI/4)),y_pos,0]} rotation={[0,0,-Math.PI/4]}>
                <sphereGeometry args={[ear_rad, 20, 14, 0, 2 * Math.PI, 0, Math.PI ]}/>
                <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
        </group>
    }

    if (figStore.arms){
        const arm_rad = figStore.diameter/7
        const y_pos = (figStore.diameter * figStore.body_height)/2
        const x_pos = (figStore.diameter * figStore.body_scale)/2 + arm_rad*1.3
        arms = 
        <group>
            <mesh position={[-(x_pos),y_pos,0]} rotation={[0,0,Math.PI/2.65]}>
                <cylinderGeometry args={[arm_rad, arm_rad, arm_rad*1.3, 15]} />
                <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh position={[x_pos,y_pos,0]} rotation={[0,0,-Math.PI/2.65]}>
                <cylinderGeometry args={[arm_rad, arm_rad, arm_rad*1.3, 15]} />
                <meshPhongMaterial  color={figStore.default_color} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
        </group>
    }

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
                <meshPhongMaterial map = {texture_body}  side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh>
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture_body}  side = {THREE.BackSide} />
            </mesh>
            {broken_head}
            {figStore.ears == "bear" && bear_ears}
            {figStore.ears == "bunny" && bunny_ears}
            {figStore.ears == "cat" && cat_ears}
            {figStore.ears == "sphere" && sphere_ears}
            {figStore.arms && arms}
        </group>
    )
  }

export default observer(Figurine);