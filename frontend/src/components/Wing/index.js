import React, { useRef, useState, useMemo, useEffect} from "react";
import { observer } from "mobx-react";
import * as THREE from "three";
import grid from "../../assets/paper.PNG";

const Wing = (props) => {
    const {vertices, purpose} = props
    const my_vertices = useMemo(() => vertices.map(v => new THREE.Vector3(...v)), [])

    const faces = []
    if (purpose == "wing"){
        faces.push(
            new THREE.Face3(17, 8, 7),
            new THREE.Face3(16, 17, 7),
            new THREE.Face3(16, 7, 6),
            new THREE.Face3(15, 16, 6),
            new THREE.Face3(15, 6, 5),
            new THREE.Face3(14, 15, 5),
            new THREE.Face3(14, 5, 4),
            new THREE.Face3(13, 14, 4),
            new THREE.Face3(13, 4, 3),
            new THREE.Face3(12, 13, 3),
            new THREE.Face3(12, 3, 2),
            new THREE.Face3(11, 12, 2),
            new THREE.Face3(11, 2, 1),
            new THREE.Face3(10, 11, 1),
            new THREE.Face3(10, 1, 0),
            new THREE.Face3(9, 10, 0),
            // top row 
            new THREE.Face3(18, 17, 16),
            new THREE.Face3(18, 16, 15),
            new THREE.Face3(18, 15, 14),
            new THREE.Face3(18, 14, 13),
            new THREE.Face3(18, 13, 12),
            new THREE.Face3(18, 12, 11),
            new THREE.Face3(18, 11, 10),
            new THREE.Face3(18, 10, 9),
        )
    }
    else if (purpose == "front-back"){
        faces.push(
            new THREE.Face3(5, 4, 3),
            new THREE.Face3(5, 3, 2),
            new THREE.Face3(5, 2, 1),
            new THREE.Face3(5, 1, 0),
        )
    }

    else if (purpose == "one-wing"){
        faces.push(
            new THREE.Face3(9, 8, 7),
            new THREE.Face3(9, 7, 6),
            new THREE.Face3(9, 6, 5),
            new THREE.Face3(9, 5, 4),
            new THREE.Face3(9, 4, 3),
            new THREE.Face3(9, 3, 2),
            new THREE.Face3(9, 2, 1),
            new THREE.Face3(9, 1, 0),
        )
    }

    // const uvs = [[
    //     // front
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    //     // right
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    //     // back
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    //     // left
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    //     // top
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    //     // bottom
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
    //     [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    // ]]

    function update(geometry){
        geometry.computeFaceNormals()
        geometry.computeVertexNormals();
        for (let i = 0; i < geometry.vertices.length; i++){
            geometry.vertices[i].x = vertices[i][0]
            geometry.vertices[i].y = vertices[i][1]
            geometry.vertices[i].z = vertices[i][2]
        }
        geometry.verticesNeedUpdate = true
        geometry.normalsNeedUpdate = true;
    }

    return (
        // <geometry vertices={my_vertices} faces={faces} faceVertexUVs={uvs} onUpdate={update}/>
        <geometry vertices={my_vertices} faces={faces} onUpdate={update}/>
    )
  }

export default observer(Wing);