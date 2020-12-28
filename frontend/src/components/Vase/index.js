import React, { useRef, useState, useMemo, Suspense } from "react";
import {useFrame} from "react-three-fiber";
import * as THREE from "three";
import rose from "../../assets/paper.PNG";

/* constraints: 
- d1_height < d2_height < d3_height 
- 0 < d1, d2, d3 < 100cm
- 0 < height < 100cm
*/

//raw user inputs
const height = 100
const diameter_top = 40
const diameter_bottom = 40 
const diameter_1 = 70
const diameter_1_h = 50
const diameter_2 = 20
const diameter_2_h = 70
const diameter_3 = 20
const diameter_3_h = 90
const top_rim = true 
const bottom_rim = false
const bottom_disk = false

// calculated values 
const height_scaleto = 36
const top_height = height_scaleto/2
const bottom_height = -1 * top_height
const scale_factor = height_scaleto/height

const dtop = diameter_top * scale_factor
const dbottom = diameter_bottom * scale_factor

const d1 = diameter_1 * scale_factor
const d1_height = (diameter_1_h * scale_factor) - top_height

const d2 = diameter_2 * scale_factor
const d2_height = (diameter_2_h * scale_factor) - top_height

const d3 = diameter_3 * scale_factor
const d3_height = (diameter_3_h * scale_factor) - top_height

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

const dtop_marker = top_rim ? getInputMarker((dtop/2) + 0.6, top_height) : getInputMarker((dtop/2) + 0.1, top_height) 
const dbottom_marker = bottom_rim ? getInputMarker((dbottom/2) + 0.6, bottom_height) : getInputMarker((dbottom/2) + 0.1, bottom_height)
const d1_marker = getInputMarker((d1/2) + 0.1, d1_height)
const d2_marker = getInputMarker((d2/2) + 0.1, d2_height)
const d3_marker = getInputMarker((d3/2) + 0.1, d3_height)

if (top_rim){
    top_rim_mesh = <mesh position = {[0,top_height+0.1,0]} rotation = {[1.57,0,0]}> 
    <torusGeometry args={[(dtop/2)+0.1,0.4,10,50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>
}
if (bottom_rim){
    bottom_rim_mesh = <mesh position = {[0,bottom_height-0.1,0]} rotation = {[1.57,0,0]}> 
    <torusGeometry args={[(dbottom/2)+0.1, 0.4, 10, 50]}/>
    <meshPhongMaterial color="#FF7E98" />
    </mesh>
}


var myPoints = [bottom_height,dbottom/2, d1_height,d1/2, d2_height,d2/2, d3_height,d3/2, top_height,dtop/2]; 
var tension = 0.4
var numOfSegments = 6

function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    // use input value if provided, or use a default value   
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    // clone array so we don't change the original
    //
    _pts = pts.slice(0);

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.push(pts[0]);
        _pts.push(pts[1]);
    }
    else {
        _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
        _pts.unshift(pts[0]);
        _pts.push(pts[pts.length - 2]); //copy last point and append
        _pts.push(pts[pts.length - 1]);
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=2; i < (_pts.length - 4); i+=2) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+2] - _pts[i-2]) * tension;
            t2x = (_pts[i+4] - _pts[i]) * tension;

            t1y = (_pts[i+3] - _pts[i-1]) * tension;
            t2y = (_pts[i+5] - _pts[i+1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push(x);
            res.push(y);

        }
    }

    return res;
}

let points = [];
const new_pts = getCurvePoints(myPoints, tension, false, numOfSegments)
for (let i=0; i<new_pts.length; i+=2){
    const h = new_pts[i]
    const r = new_pts[i+1]
    points.push( new THREE.Vector2(r, h));
}

const Vase = (props) => {
    // const mesh = useRef();
    const texture = useMemo(() => new THREE.TextureLoader().load(rose), []);
    // texture.wrapS = THREE.MirroredRepeatWrapping;
    // texture.wrapT = THREE.MirroredRepeatWrapping;
    // texture.repeat.set(2, 2.6);

    let [x_rot,changeXrot] = useState(0);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);

    if (bottom_disk){
        bottom_disk_mesh = <mesh position = {[0,bottom_height,0]}>
            <cylinderGeometry args={[dbottom/2, dbottom/2, 0.8, 32]}/>
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
            {top_rim && top_rim_mesh}
            {bottom_rim && bottom_rim_mesh}
            {bottom_disk && bottom_disk_mesh}
            {dbottom_marker}
            {d1_marker}
            {d2_marker}
            {d3_marker}
            {dtop_marker}
            {/* <mesh position = {[0,-15.7,0]} ref={mesh}>
                <cylinderGeometry args={[8, 8, 0.8, 32]}/>
                <meshPhongMaterial color="black" />
            </mesh> */}
        </group>
    )
  }

export default Vase;