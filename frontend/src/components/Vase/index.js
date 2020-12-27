import React, { useRef, useState, useMemo } from "react";
import {useFrame } from "react-three-fiber";
import * as THREE from "three";
import rose from "../../assets/paper.PNG";

// THREE.SceneUtils = {

// 	createMultiMaterialObject: function ( geometry, materials ) {
// 		var group = new THREE.Group();
// 		for ( var i = 0, l = materials.length; i < l; i ++ ) {
// 			group.add( new THREE.Mesh( geometry, materials[ i ] ) );
// 		}
// 		return group;
// 	},

// 	detach: function ( child, parent, scene ) {
// 		child.applyMatrix( parent.matrixWorld );
// 		parent.remove( child );
// 		scene.add( child );
// 	},

// 	attach: function ( child, scene, parent ) {
// 		child.applyMatrix( new THREE.Matrix4().getInverse( parent.matrixWorld ) );
// 		scene.remove( child );
// 		parent.add( child );
// 	}
// };

let points = [];
points.push( new THREE.Vector2( 7.75, -15.88) );
points.push( new THREE.Vector2( 7.8, -13.95 ) );
points.push( new THREE.Vector2( 8.3, -12.02) );
points.push( new THREE.Vector2( 8.97, -10.01 ) );
points.push( new THREE.Vector2( 9.7, -8.01 ) );
points.push( new THREE.Vector2( 10.55, -5.94 ) );
points.push( new THREE.Vector2( 11.45, -3.99 ) );
points.push( new THREE.Vector2( 12.3, -1.9 ) );
points.push( new THREE.Vector2( 13.09, 0.83 ) );
points.push( new THREE.Vector2( 13.36, 3.21 ) );
points.push( new THREE.Vector2( 13.21, 6.01 ) );
points.push( new THREE.Vector2( 12.63, 8.04) );
points.push( new THREE.Vector2( 11.73, 9.93 ) );
points.push( new THREE.Vector2( 10.43, 11.46 ) );
points.push( new THREE.Vector2( 9.25, 12.41) );
points.push( new THREE.Vector2( 7.91, 13.35) );
points.push( new THREE.Vector2( 7, 14.28) );
points.push( new THREE.Vector2( 6.53, 15.86) );

const Vase = (props) => {
    const mesh = useRef();
    // useFrame(() => {
    //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    // });
    const texture = useMemo(() => new THREE.TextureLoader().load(rose), []);
    // texture.wrapS = THREE.MirroredRepeatWrapping;
    // texture.wrapT = THREE.MirroredRepeatWrapping;
    // texture.repeat.set(2, 2.6);

    var lathe;
    var torus1, torus2, cylinder;

    // var geometry = new THREE.LatheGeometry( points, 30, 0, 2*Math.PI );
    // var geometry = <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
    
    // var outer_material = new THREE.MeshPhongMaterial({map: texture, side: THREE.FrontSide, specular: 0x121212, shininess: 26});
    // var outer_material = <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="0x121212" shininess = {26}/>
    
    // var inner_material = new THREE.MeshPhongMaterial({color: "black", side: THREE.BackSide});
    // var inner_material = <meshPhoneMaterial color="black" side = {THREE.BackSide} />
   
    // var materials = [ inner_material, outer_material]
    
    // lathe = THREE.SceneUtils.createMultiMaterialObject(geometry, materials)
    lathe = <group rotation={[0.3,0,0]}>
        <mesh>
            <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
            <meshPhoneMaterial color="black" side = {THREE.BackSide} />
        </mesh>
        <mesh position = {[0,15.8,0]} rotation = {[1.57,0,0]}> 
            <torusGeometry args={[7,0.45,30,100]}/>
            <meshPhongMaterial color="black" />
        </mesh>
        <mesh position = {[0,-15.7,0]} rotation = {[1.57,0,0]}> 
            <torusGeometry args={[8, 0.3, 30, 100]}/>
            <meshPhongMaterial color="black" />
        </mesh>
        <mesh position = {[0,-15.7,0]}>
            <cylinderGeometry args={[8, 8, 0.8, 32]}/>
            <meshPhongMaterial color="black" />
        </mesh>
    </group>
    
    // var geometry2 = new THREE.TorusGeometry( 7, 0.45, 30, 100 );
    // var material2 = new THREE.MeshPhongMaterial( { color: "black" });
    // torus1 = new THREE.Mesh( geometry2, material2 );
    // torus1.position.y = 15.8;
    // torus1.rotation.x += 1.57;

    torus1 = <mesh position = {[0,15.8,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[7,0.45,30,100]}/>
        <meshPhongMaterial color="black" />
    </mesh>

    // var geometry3 = new THREE.TorusGeometry( 8, 0.3, 30, 100 );
    // var material3 = new THREE.MeshPhongMaterial( { color: "black" } );
    // torus2 = new THREE.Mesh( geometry3, material3 );
    // torus2.position.y = -15.7;
    // torus2.rotation.x += 1.57;

    torus2 = <mesh position = {[0,-15.7,0]} rotation = {[1.57,0,0]}> 
        <torusGeometry args={[8, 0.3, 30, 100]}/>
        <meshPhongMaterial color="black" />
    </mesh>

    // var geometry4 = new THREE.CylinderGeometry( 8, 8, 0.8, 32 );
    // var material4 = new THREE.MeshPhongMaterial( {color: "black" } );
    // cylinder = new THREE.Mesh( geometry4, material4 );
    // cylinder.position.y = -15.7;

    cylinder = <mesh position = {[0,-15.7,0]}>
        <cylinderGeometry args={[8, 8, 0.8, 32]}/>
        <meshPhongMaterial color="black" />
    </mesh>

    // lathe.add(torus1)
    // lathe.add(torus2);
    // lathe.add(cylinder);
    // lathe.rotation.x += 0.3;	
    let [x_rot,changeXrot] = useState(0.3);
    let [y_rot,changeYrot] = useState(0);
    let [z_rot,changeZrot] = useState(0);

    const handleKeyDown = (event) => {
        // if (init_done == false)
        //     return; 

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
                    x_rot = 0.3
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
            <meshPhongMaterial map = {texture} side={THREE.FrontSide} specular="#121212" shininess = {26}/>
        </mesh>
        <mesh>
            <latheGeometry args={[points, 30, 0, 2*Math.PI]}/>
            <meshPhongMaterial color="black" side = {THREE.BackSide} />
        </mesh>
        <mesh position = {[0,15.8,0]} rotation = {[1.57,0,0]}> 
            <torusGeometry args={[7,0.45,30,100]}/>
            <meshPhongMaterial color="black" />
        </mesh>
        <mesh position = {[0,-15.7,0]} rotation = {[1.57,0,0]}> 
            <torusGeometry args={[8, 0.3, 30, 100]}/>
            <meshPhongMaterial color="black" />
        </mesh>
        {/* <mesh position = {[0,-15.7,0]} ref={mesh}>
            <cylinderGeometry args={[8, 8, 0.8, 32]}/>
            <meshPhongMaterial color="black" />
        </mesh> */}
    </group>
    )
  }

export default Vase;