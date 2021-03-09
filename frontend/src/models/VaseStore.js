import { types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsNew(_pts, tension, numOfSegments) {

    var res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    const first_x = _pts[0]
    const first_y = _pts[1]
    const last_x = _pts[8]
    const last_y = _pts[9]

    _pts.unshift(first_y)
    _pts.unshift(first_x)
    _pts.push(last_x)
    _pts.push(last_y)

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
            res.push(Math.max(y, 0.5));

        }
    }
    return res;
}

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
    dtop: 20,
    d3: 10, 
    d2: 10, 
    d1: 35,
    dbottom: 20, 
    dtop_h: 100, 
    d3_h: 90, 
    d2_h: 70, 
    d1_h: 50, 
    dbottom_h: 0, 
    height: 50,
    top_rim: false, 
    bottom_rim: true, 
    flat_bottom: true, 
    scale_h: 36,
    default_color: "#FFFFFF",
    tot_rows_per_section: types.optional(types.array(types.number), [15,9,10,10,10]), // bottom to top 
    subsections: types.optional(types.array(types.array(types.number)),[[5,4],[3,2],[1],[0]]), 
    // vase has 4 sections, each may be made of 1+ drawing sections // bottom to top
    // it's numbered like that so you can refer to the corresponding section in modelDimensions
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom of vase
    modelDimensions: types.optional(types.array(types.array(types.number)), [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]), // top to bottom
    // unused, only for consistency: 
    arms: false, 
    ears: "", 
    lid: false, 
    top_handle: false, 
    side_handles: false, 
  })
  .actions(self => ({
    update_top_rim(top_rim){
        self.top_rim = top_rim
    },
    update_bottom_rim(bottom_rim){
        self.bottom_rim = bottom_rim
    },
    update_flat_bottom(flat_bottom){
        self.flat_bottom = flat_bottom
    },
    update_units(units){
        self.cm = units
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
    update_d_heights(vals){
        self.d3_h = vals[3]
        self.d2_h = vals[2]
        self.d1_h = vals[1]
    },
    storePic(picData){
        self.textures.push(picData)
        // console.log(picData)
    },
    setDefaultColor(color){
        self.default_color = color
    },
    getDimensions() {
        self.maxWidth = 53 // un hard code
        return self.modelDimensions
      },
    updateCurvedPts(broken=false){
        const s_dtop_h = self.scale_h/2
        const s_dbottom_h = -1 * s_dtop_h
        const scale_factor = self.scale_h/self.height
    
        const s_dtop = self.dtop * scale_factor
        const s_dbottom = self.dbottom * scale_factor
    
        const s_d1 = self.d1 * scale_factor
        const s_d1_h = (self.d1_h/100) * self.scale_h - s_dtop_h
    
        const s_d2 = self.d2 * scale_factor
        const s_d2_h = (self.d2_h/100) * self.scale_h - s_dtop_h
    
        const s_d3 = self.d3 * scale_factor
        const s_d3_h = (self.d3_h/100) * self.scale_h - s_dtop_h

        var myPoints = [s_dbottom_h,s_dbottom/2, s_d1_h,s_d1/2,s_d2_h,s_d2/2, s_d3_h,s_d3/2, s_dtop_h,s_dtop/2]; 
        var tension = 0.4
        var numOfSegments = 6
        let points = [];
        const new_pts = getCurvePointsNew(myPoints, tension, numOfSegments)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        if (!broken) return points
        else{
            let section_pts = []
            let broken_pts = []
            let broken_pts_three = []
            let lo = 0 
            let hi = 2
            while (hi+3 < new_pts.length){
                if (new_pts[hi] == new_pts[hi+2] && new_pts[hi+1] == new_pts[hi+3]){
                    const temp = new_pts.slice(lo,hi+2)
                    section_pts.push(temp)
                    lo = hi + 2
                }
                hi += 2
            }
            section_pts.push(new_pts.slice(lo,new_pts.length))
            for (let i=0; i<4; i+=1){ //section_pts.length = 4
                let curr_idx = 0
                for (let j=0; j<self.subsections[i].length; j+=1){
                    if (self.subsections[i].length > 1){
                        // console.log(self.modelDimensions[self.subsections[i][j]][1])
                        let slice_size = Math.round((self.modelDimensions[self.subsections[i][j]][1] / self.tot_rows_per_section[i]) * (section_pts[i].length/2))
                        slice_size = slice_size * 2
                        const slice = section_pts[i].slice(curr_idx,curr_idx + slice_size+2)
                        curr_idx += slice_size
                        broken_pts.push(slice)
                    } 
                    else {
                        broken_pts.push(section_pts[i])
                    }
                }
            }
            for(let j=0; j<broken_pts.length; j+= 1){
                let temp = []
                for(let k = 0; k < broken_pts[j].length; k += 2){
                    const h = broken_pts[j][k]
                    const r = broken_pts[j][k+1]
                    temp.push( new THREE.Vector2(r, h));
                }
                broken_pts_three.push(temp)
            }
            
            return broken_pts_three
        }
    }
  }))
  .views(self => ({
  }));

export default VaseStore;

const VaseContext = React.createContext();

export const VaseProvider = ({ children, store }) => {
    return (
      <VaseContext.Provider value={store}>{children}</VaseContext.Provider>
    );
  };

export const useVaseStore = () => React.useContext(VaseContext);

export const withVaseStore = (Component) => (props) => {
    return <Component {...props} store={useVaseStore()} />;
  };