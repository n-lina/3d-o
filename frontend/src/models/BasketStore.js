import { types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsBasket(_pts, tension, numOfSegments) {

    var res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    const first_x = _pts[0]
    const first_y = _pts[1]
    const last_x = _pts[4]
    const last_y = _pts[5]

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
            res.push(Math.max(0.5, y));

        }
    }
    return res;
}

const BasketStore = types
  .model("Basket", {
    cm: false,
    height: 20, 
    diameter: 34, 
    dtop: 20, 
    dbottom: 20,
    top_rim: true, 
    bottom_rim: true, 
    lid: true, 
    top_handle: true, 
    side_handles: false, 
    scale_h: 15,
    flat_bottom: false, 
    default_color: "#FFFFFF",
    tot_rows_per_section: types.optional(types.array(types.number), [15,29]), // bottom to top 
    subsections: types.optional(types.array(types.array(types.number)),[[4,3],[2,1,0]]), 
    // basket has 2 sections, each may be made of 1+ drawing sections // bottom to top
    // it's numbered like that so you can refer to the corresponding section in modelDimensions
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom 
    modelDimensions: types.optional(types.array(types.array(types.number)), [[53,10],[40,10],[28,9],[16,10],[13,5]]),
    // unused, only for consistency: 
    arms: false, 
    ears: "" 
  })
  .actions(self => ({
    update_top_rim(top_rim){
        self.top_rim = top_rim
    },
    update_bottom_rim(bottom_rim){
        self.bottom_rim = bottom_rim
    },
    update_top_handle(top_handle){
        self.top_handle = top_handle
    },
    update_side_handles(side_handles){
        self.side_handles = side_handles
    },
    update_lid(lid){
        self.lid = lid 
    },
    update_units(units){
        self.cm = units
    },
    update_height(height){
        self.height = height
    }, 
    update_diameter(diameter){
        self.diameter = diameter
    }, 
    update_dtop(dtop){
        self.dtop = dtop
    }, 
    update_dbottom(dbottom){
        self.dbottom = dbottom
    }, 
    update_flat_bottom(val) {
        self.flat_bottom = val
    },
    setDefaultColor(color){
        self.default_color = color
    },
    getDimensions() {
        self.maxWidth = 53
        return self.modelDimensions
    },
    storePic(picData){
        self.textures.push(picData)
    },
    clearTextures(){
        self.textures = []
    },
    setDefaultColor(color){
        self.default_color = color
    },
    updateCurvedPts(broken=false){
        const s_dtop_h = self.scale_h/2
        const s_dbottom_h = -1 * s_dtop_h
        const scale_factor = self.scale_h/self.height
    
        const s_dtop = self.dtop * scale_factor
        const s_dbottom = self.dbottom * scale_factor
    
        const s_diameter = self.diameter * scale_factor
        const s_diameter_h = 0

        var myPoints = [s_dbottom_h,s_dbottom/2, s_diameter_h,s_diameter/2, s_dtop_h,s_dtop/2]; 
        var tension = 0.8
        var numOfSegments = 10
        let points = [];
        const new_pts = getCurvePointsBasket(myPoints, tension, numOfSegments)
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
            for (let i=0; i<2; i+=1){ //section_pts.length = 4
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

export default BasketStore;

const BasketContext = React.createContext();

export const BasketProvider = ({ children, store }) => {
    return (
      <BasketContext.Provider value={store}>{children}</BasketContext.Provider>
    );
  };

export const useBasketStore = () => React.useContext(BasketContext);

export const withBasketStore = (Component) => (props) => {
    return <Component {...props} store={useBasketStore()} />;
  };