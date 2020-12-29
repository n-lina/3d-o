import React, { useRef, useState, useMemo} from "react";
import {useFrame} from "react-three-fiber";
import * as THREE from "three";
import rose from "../../assets/paper.PNG";

import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import VaseStore from "../../models/VaseStore";

const vase = VaseStore.create();

onPatch(vase, patch => {
  console.log(patch);
  console.log("hi")
  console.log(vase.units())
});
makeInspectable(vase);


/* constraints: 
- d1_height < d2_height < d3_height 
- 0 < d1, d2, d3 < 100cm
- 0 < height < 100cm
*/

// scaled values 
const s_dtop_h = vase.scale_h/2
const s_dbottom_h = -1 * s_dtop_h
const scale_factor = vase.scale_h/vase.height

const s_dtop = vase.dtop * scale_factor
const s_dbottom = vase.dbottom * scale_factor

const s_d1 = vase.d1 * scale_factor
const s_d1_h = (vase.d1_h * scale_factor) - s_dtop_h

const s_d2 = vase.d2 * scale_factor
const s_d2_h = (vase.d2_h * scale_factor) - s_dtop_h

const s_d3 = vase.d3 * scale_factor
const s_d3_h = (vase.d3_h * scale_factor) - s_dtop_h

let top_rim_mesh = <mesh/>
let bottom_rim_mesh = <mesh />
let bottom_disk_mesh = <mesh />

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
    <torusGeometry args={[(s_dtop/2)+0.1,0.4,10,50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>
}
if (vase.bottom_rim){
    bottom_rim_mesh = <mesh position = {[0,s_dbottom_h-0.1,0]} rotation = {[1.57,0,0]}> 
    <torusGeometry args={[(s_dbottom/2)+0.1, 0.4, 10, 50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>
}

const points = vase.updateCurvedPts()

const Vase = (props) => {
    // const mesh = useRef();
    const texture = useMemo(() => new THREE.TextureLoader().load(rose), []);
    // texture.wrapS = THREE.MirroredRepeatWrapping;
    // texture.wrapT = THREE.MirroredRepeatWrapping;
    // texture.repeat.set(2, 2.6);

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);

    if (vase.bottom_disk){
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
            case " ": 
                    event.preventDefault()
                    x_rot = 0
                    y_rot = 0
                    z_rot = 0 
                    changeXrot(x_rot)
                    changeYrot(y_rot)
                    changeZrot(z_rot)
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
        <group rotation={[x_rot,y_rot,z_rot]}>
            <mesh >
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture} color="pink" side={THREE.FrontSide} specular="#121212" shininess = {26}/>
            </mesh>
            <mesh>
                <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
                <meshPhongMaterial map = {texture} color="pink" side = {THREE.BackSide} />
            </mesh>
            {vase.top_rim && top_rim_mesh}
            {vase.bottom_rim && bottom_rim_mesh}
            {vase.bottom_disk && bottom_disk_mesh}
            {dbottom_marker}
            {d1_marker}
            {d2_marker}
            {d3_marker}
            {dtop_marker}
        </group>
    )
  }

export default Vase;