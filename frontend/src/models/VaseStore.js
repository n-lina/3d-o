import { types } from "mobx-state-tree";
import * as THREE from "three";

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

const VaseStore = types
  .model("Vase", {
    cm: false,
    percent: false,
    dtop: 40,
    d3: 20, 
    d2: 20, 
    d1: 70,
    dbottom: 40, 
    dtop_h: 100, 
    d3_h: 90, 
    d2_h: 70, 
    d1_h: 50, 
    dbottom_h: 0, 
    height: 100,
    top_rim: false, 
    bottom_rim: true, 
    bottom_disk: true, 
    scale_h: 36,
  })
  .actions(self => ({
    update_top_rim(top_rim){
        self.top_rim = top_rim
    },
    update_bottom_rim(bottom_rim){
        self.bottom_rim = bottom_rim
    },
    update_bottom_disk(bottom_disk){
        self.bottom_disk = bottom_disk
    },
    update_height(height){
        self.height = height
    }, 
    update_dtop(dtop){
        self.dtop = dtop
    }, 
    update_d3(d3){
        self.d3 = d3
    }, 
    update_d2(d2){
        self.d2 = d2
    }, 
    update_d1(d1){
        self.d1 = d1
    }, 
    update_dbottom(dbottom){
        self.dbottom = dbottom
    },
    update_dtop_h(dtop_h){
        self.dtop_h = dtop_h
    }, 
    update_d3_h(d3_h){
        self.d3_h = d3_h
    }, 
    update_d2_h(d2_h){
        self.d2_h = d2_h
    }, 
    update_d1_h(d1_h){
        self.d1_h = d1_h
    }, 
    update_dbottom_h(dbottom_h){
        self.dbottom_h = dbottom_h
    },
    updateCurvedPts(){
        const s_dtop_h = self.scale_h/2
        const s_dbottom_h = -1 * s_dtop_h
        const scale_factor = self.scale_h/self.height
        
        const s_dtop = self.dtop * scale_factor
        const s_dbottom = self.dbottom * scale_factor
        
        const s_d1 = self.d1 * scale_factor
        const s_d1_h = (self.d1_h * scale_factor) - s_dtop_h
        
        const s_d2 = self.d2 * scale_factor
        const s_d2_h = (self.d2_h * scale_factor) - s_dtop_h
        
        const s_d3 = self.d3 * scale_factor
        const s_d3_h = (self.d3_h * scale_factor) - s_dtop_h

        var myPoints = [s_dbottom_h,s_dbottom/2, s_d1_h,s_d1/2,s_d2_h,s_d2/2, s_d3_h,s_d3/2, s_dtop_h,s_dtop/2]; 
        var tension = 0.4
        var numOfSegments = 6
        let points = [];
        const new_pts = getCurvePoints(myPoints, tension, false, numOfSegments)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        return points
    }
  }))
  .views(self => ({
    units() {
        return self.cm ? "CM" : "IN"
    }
  }));

export default VaseStore;
