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

// function getCurvePoints(pts, tension, isClosed, numOfSegments) {

//     // use input value if provided, or use a default value   
//     tension = (typeof tension != 'undefined') ? tension : 0.5;
//     isClosed = isClosed ? isClosed : false;
//     numOfSegments = numOfSegments ? numOfSegments : 16;

//     var _pts = [], res = [],    // clone array
//         x, y,           // our x,y coords
//         t1x, t2x, t1y, t2y, // tension vectors
//         c1, c2, c3, c4,     // cardinal points
//         st, t, i;       // steps based on num. of segments

//     // clone array so we don't change the original
//     //
//     _pts = pts.slice(0);

//     // The algorithm require a previous and next point to the actual point array.
//     // Check if we will draw closed or open curve.
//     // If closed, copy end points to beginning and first points to end
//     // If open, duplicate first points to befinning, end points to end
//     if (isClosed) {
//         _pts.unshift(pts[pts.length - 1]);
//         _pts.unshift(pts[pts.length - 2]);
//         _pts.unshift(pts[pts.length - 1]);
//         _pts.unshift(pts[pts.length - 2]);
//         _pts.push(pts[0]);
//         _pts.push(pts[1]);
//     }
//     else {
//         _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
//         _pts.unshift(pts[0]);
//         _pts.push(pts[pts.length - 2]); //copy last point and append
//         _pts.push(pts[pts.length - 1]);
//     }

//     // ok, lets start..

//     // 1. loop goes through point array
//     // 2. loop goes through each segment between the 2 pts + 1e point before and after
//     for (i=2; i < (_pts.length - 4); i+=2) {
//         for (t=0; t <= numOfSegments; t++) {

//             // calc tension vectors
//             t1x = (_pts[i+2] - _pts[i-2]) * tension;
//             t2x = (_pts[i+4] - _pts[i]) * tension;

//             t1y = (_pts[i+3] - _pts[i-1]) * tension;
//             t2y = (_pts[i+5] - _pts[i+1]) * tension;

//             // calc step
//             st = t / numOfSegments;

//             // calc cardinals
//             c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
//             c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
//             c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
//             c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

//             // calc x and y cords with common control vectors
//             x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
//             y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

//             //store points in array
//             res.push(x);
//             res.push(y);

//         }
//     }

//     return res;
// }

const VaseStore = types
  .model("Vase", {
    cm: true,
    dtop: 20, //20
    d3: 10, //10
    d2: 10, //10
    d1: 35, //35
    dbottom: 20, //20 
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
    tot_rows_per_section: types.optional(types.array(types.number), []), // bottom to top ex. [15,19,10,10]
    subsections: types.optional(types.array(types.array(types.number)),[]), // ex.[[5,4],[3,2],[1],[0]]
    // vase has 4 sections, each may be made of 1+ drawing sections // bottom to top
    // it's numbered like that so you can refer to the corresponding section in modelDimensions
    merged_sections: types.optional(types.array(types.array(types.number)), []), // ex. [[0,1,2],[3]] means sections 0, 1, 2 were merged into one section; bottom to top ie. section including bottom diameter = section 0
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom of vase
    modelDimensions: types.optional(types.array(types.array(types.number)), []), // top to bottom ex. [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]
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
    in_to_cm(){
        const conv = 2.54
        self.dtop = Math.round(self.dtop * conv)
        self.d3 = Math.round(self.d3 * conv)
        self.d2 = Math.round(self.d2 * conv)
        self.d1 = Math.round(self.d1 * conv)
        self.dbottom = Math.round(self.dbottom * conv)
        self.height = Math.round(self.height * conv)
        self.cm = true
    },
    cm_to_in(){
        const conv = 2.54
        self.dtop = Math.round(self.dtop / conv)
        self.d3 = Math.round(self.d3 / conv)
        self.d2 = Math.round(self.d2 / conv)
        self.d1 = Math.round(self.d1 / conv)
        self.dbottom = Math.round(self.dbottom / conv)
        self.height = Math.round(self.height / conv)
        self.cm = false
    },
    update_units(units){
        if (self.cm == units) return 
        // changing from in to cm
        if (self.cm == false && units == true){
            self.in_to_cm()
        }
        // changing from cm to in
        else{
            self.cm_to_in()
        }
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
    clearTextures(){
        self.textures = []
    },
    setDefaultColor(color){
        self.default_color = color
    },
    cmToPcs(cm, height=false){
        const height_factor = 0.55 // 0.5 cm height per row
        const width_factor = 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(((cm/100) * self.height)/height_factor)
        }
        return Math.round(cm/width_factor)
    },
    getDimensions() {
        // INPUTS 
        // dtop: 20,
        // d3: 10, 
        // d2: 10, 
        // d1: 35,
        // dbottom: 20, 
        // dtop_h: 100, 
        // d3_h: 90, 
        // d2_h: 70, 
        // d1_h: 50, 
        // dbottom_h: 0, 
        // height: 50,

        // OUTPUTS
        // tot_rows_per_section: types.optional(types.array(types.number), [15,19,10,10]), // bottom to top 
        // subsections: types.optional(types.array(types.array(types.number)),[[5,4],[3,2],[1],[0]]), // bottom to top
        // modelDimensions: types.optional(types.array(types.array(types.number)), [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]), // top to bottom

        // max allowed decrease rate: -1 per 5 pcs
        // max increase rate: +1 per 1 pc 
        // min 3 rows per section

        let zero_diff = [];
        let modelDimensions = []
        let subsections = [[],[],[],[]]
        let tot_rows_per_section = [0,0,0,0]
        let merged_sections = [[0],[1],[2],[3]] // bottom to top

        // convert from in to cm first 
        if (!self.cm) self.in_to_cm()

        const dbottom_h = self.cmToPcs(self.dbottom_h, true)
        const d1_h = self.cmToPcs(self.d1_h, true) // units = pieces
        const d2_h = self.cmToPcs(self.d2_h, true)
        const d3_h = self.cmToPcs(self.d3_h, true)
        const dtop_h = self.cmToPcs(self.dtop_h, true)
        const heights = [dbottom_h, d1_h, d2_h, d3_h, dtop_h]

        const dtop = self.cmToPcs(self.dtop) // units = pieces
        const d3 = self.cmToPcs(self.d3)
        const d2 = self.cmToPcs(self.d2)
        const d1 = self.cmToPcs(self.d1)
        const dbottom = self.cmToPcs(self.dbottom)
        const widths = [dbottom, d1, d2, d3, dtop]

        let max_width = widths[0]

        // getting from dbottom to d1 in d1_h pieces 

        for (let i = 0; i < widths.length-1; i++){
            const min_height = 3
            let min_height_needed = min_height
            let diff = widths[i+1]-widths[i]
            let height_diff = heights[i+1] - heights[i]

            let temp_dbottom = widths[i]
            let curr_section = []
            
            // decreasing, try making it more spaced out by height?
            if (diff > 0){
                curr_section.push([temp_dbottom,min_height])
                while (diff > 0){
                    const add_to_this_row = Math.floor(temp_dbottom/min_height)
                    const actual_add = Math.min(diff, add_to_this_row)
                    diff -= actual_add 
                    temp_dbottom += actual_add
                    max_width = Math.max(max_width, temp_dbottom)
                    if (diff == 0 && i < widths.length-2) break
                    min_height_needed += min_height
                    curr_section.unshift([temp_dbottom, min_height])
                }
            }
            // increasing
            else if (diff < 0){
                diff = diff * -1
                curr_section.push([temp_dbottom,min_height])
                while (diff > 0) {
                    const sub_from_this_row = Math.floor(temp_dbottom/5)
                    const actual_sub = Math.min(diff, sub_from_this_row)
                    diff -= actual_sub
                    temp_dbottom -= actual_sub
                    max_width = Math.max(max_width, temp_dbottom)
                    if (diff == 0 && i < widths.length-2) break
                    min_height_needed += min_height
                    curr_section.unshift([temp_dbottom,min_height])
                }            
            }
            // straight
            else if (diff == 0){
                min_height_needed = height_diff
                curr_section.push([temp_dbottom, height_diff])
                zero_diff.push(widths.length-1-1-i)
            }
            let excess_height = height_diff-min_height_needed
            while (excess_height>0){
                curr_section[excess_height%curr_section.length][1] += 1
                excess_height -= 1
            }
            tot_rows_per_section[i] = Math.max(height_diff, min_height_needed)
            modelDimensions.unshift(curr_section)    
        }
        for(let i = 0; i < zero_diff.length; i++){ // zero_diff is sorted in ascending order
            // merge right into left so that the idx's in zero_diff are still accurate
            const idx = zero_diff[i] // idx of modelDimensions
            const conj_idx = tot_rows_per_section.length-1-idx // idx of tot_rows_per_section
            if (zero_diff[i] > 0){
                if(modelDimensions[idx-1].length > 1) { // partial merge, no section deletion
                    const next_sec_last_arr = modelDimensions[idx-1].pop()
                    const next_sec_rows = next_sec_last_arr[1]
                    modelDimensions[idx][0][1] += next_sec_rows // the diff for this section is 0 so it only has one arr in it
                    tot_rows_per_section[conj_idx] += next_sec_rows
                    tot_rows_per_section[conj_idx+1] -= next_sec_rows
                }
                else { // full merge, section deletion
                    const curr_sec_last_arr = modelDimensions[idx].pop()
                    const curr_sec_rows = curr_sec_last_arr[1]
                    modelDimensions[idx-1][0][1] += curr_sec_rows
                    modelDimensions.splice(idx,1) // deleting the whole section, the right section
                    tot_rows_per_section[conj_idx] -= curr_sec_rows // should i keep it as 0 (empty)?
                    tot_rows_per_section[conj_idx+1] += curr_sec_rows
                    tot_rows_per_section.splice(conj_idx, 1)
                    subsections.pop()
                }
            }
        }
        var modelDimensions_merged = [].concat.apply([], modelDimensions);

        let curr_section = modelDimensions_merged.length-1
        for (let j = 0; j < subsections.length; j++){
            for (let k = 0; k < modelDimensions[modelDimensions.length - j - 1].length; k++){
                subsections[j].push(curr_section-k)
            }
            curr_section -= modelDimensions[modelDimensions.length - j - 1].length
        }

        self.maxWidth = max_width // un hard code
        self.modelDimensions = modelDimensions_merged
        self.subsections = subsections
        self.tot_rows_per_section = tot_rows_per_section
        console.log("tot_rows_per_section", tot_rows_per_section)
        console.log("subsections", subsections)
        console.log("modelDimensions", modelDimensions)
        // console.log("modelDimensions_merged", modelDimensions_merged)
        return modelDimensions_merged
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
                if (new_pts[hi] === new_pts[hi+2] && new_pts[hi+1] === new_pts[hi+3]){
                    const temp = new_pts.slice(lo,hi+2)
                    section_pts.push(temp)
                    lo = hi + 2
                }
                hi += 2
            }
            section_pts.push(new_pts.slice(lo,new_pts.length))
            console.log(section_pts)
            for (let i=0; i<section_pts.length; i+=1){ //section_pts.length = 4
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
                    temp.push(new THREE.Vector2(r, h));
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