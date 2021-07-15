import { types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsNew(_pts, tension, numOfSegmentsArr) {

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
        let numOfSegments = numOfSegmentsArr[(i/2)-1]
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
    d3: 5, //10
    d2: 31, //10
    d1: 20, //35
    dbottom: 32, //20 
    dtop_h: 100, 
    d3_h: 75, //90
    d2_h: 50, //70
    d1_h: 25, //50
    dbottom_h: 0, 
    height: 50,
    top_rim: false, 
    bottom_rim: false, //true
    flat_bottom: false, //true
    scale_h: 36,
    default_color: "#FFFFFF",
    upsize: false, 
    tot_rows_per_section: types.optional(types.array(types.number), []), // bottom to top ex. [15,19,10,10]
    subsections: types.optional(types.array(types.array(types.number)),[]), // ex.[[5,4],[3,2],[1],[0]] // subsections are drawingSections
    // vase has up to 4 sections, each may be made of 1+ drawing sections // bottom to top
    // it's numbered like that so you can refer to the corresponding section in modelDimensions
    // sections can only be merged up, ie. vals >= indeces
    merged_sections: types.optional(types.array(types.number), [0,1,2,3]), // ex. [2,2,2,3] means sections 0, 1, 2 were merged into one section; bottom to top ie. section including bottom diameter = index 0
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom of vase
    modelDimensions: types.optional(types.array(types.array(types.number)), []), // top to bottom ex. [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]
    maxWidth: 0,
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
    },
    clearTextures(){
        self.textures = []
    },
    setDefaultColor(color){
        self.default_color = color
    },
    setSize(){
        const conv = 2.54
        const dbottom_cm = self.cm ? self.dbottom : self.dbottom * conv
        const d1_cm = self.cm ? self.d1 : self.d1 * conv
        const d2_cm = self.cm ? self.d1 : self.d2 * conv
        const d3_cm = self.cm ? self.d1 : self.d3 * conv
        const dtop_cm = self.cm ? self.dtop : self.dtop * conv
        const height_cm = self.cm ? self.height : self.height * conv
        const average_diameter_cm = (dbottom_cm + d1_cm + d2_cm + d3_cm + dtop_cm)/5
        if (average_diameter_cm > 30 || height_cm > 70){
            self.upsize = true
        }
    },
    cmToPcs(cm, height=false){
        const height_factor = 0.55 // 0.55 cm height per row
        const width_factor = 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(((cm/100) * self.height)/height_factor)
        }
        return Math.round(cm/width_factor)
    },
    union(upper_section_idx, lower_section_idx){
    // note that self.merged_sections is bottom to top so upper indexes will have a higher value 
        const upper_section_root = self.find(upper_section_idx)
        const lower_section_root = self.find(lower_section_idx)
        if (upper_section_root == lower_section_root) return 
        self.merged_sections[lower_section_root] = upper_section_root
    },
    find(idx){
        if (self.merged_sections[idx] == idx) return idx
        return self.find(self.merged_sections[idx])
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

        // convert from in to cm first 
        if (!self.cm) self.in_to_cm()

        const dbottom_h = 0
        const d1_h = self.cmToPcs(self.d1_h, true) // units = pieces
        const d2_h = self.cmToPcs(self.d2_h, true)
        const d3_h = self.cmToPcs(self.d3_h, true)
        const dtop_h = self.cmToPcs(self.dtop_h, true)
        const heights = [dbottom_h, d1_h, d2_h, d3_h, dtop_h]

        const ctop = self.cmToPcs(Math.PI * self.dtop) // units = pieces
        const c3 = self.cmToPcs(Math.PI * self.d3)
        const c2 = self.cmToPcs(Math.PI * self.d2)
        const c1 = self.cmToPcs(Math.PI * self.d1)
        const cbottom = self.cmToPcs(Math.PI * self.dbottom)
        const widths = [cbottom, c1, c2, c3, ctop]

        let max_width = widths[0]

        // getting from diameter to diameter in 'height' pieces 

        for (let i = 0; i < widths.length-1; i++){
            const min_height = 3
            let min_height_needed = min_height
            let diff = widths[i+1]-widths[i]
            let height_diff = heights[i+1] - heights[i]

            let temp_dbottom = widths[i]
            let curr_section = []
            
            // increasing
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
            // decreasing
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
            // merge right(lower) into left(upper) so that the idx's in zero_diff are still accurate
            // modelDimensions is top to bottom so right = lower and left = upper
            const idx = zero_diff[i] // idx of modelDimensions
            const conj_idx = tot_rows_per_section.length-1-idx // idx of tot_rows_per_section
            const conj_idx_orig = 4 - 1 - idx// 4 = self.merged_sections.length
            if (zero_diff[i] > 0){
                if(modelDimensions[idx-1].length > 1) { // partial merge, no section deletion
                    const next_sec_last_arr = modelDimensions[idx-1].pop()
                    const next_sec_rows = next_sec_last_arr[1]
                    modelDimensions[idx][0][1] += next_sec_rows // the diff for this section is 0 so it only has one arr in it
                    tot_rows_per_section[conj_idx] += next_sec_rows
                    tot_rows_per_section[conj_idx+1] -= next_sec_rows
                }
                else { // full merge, section deletion, this occurs when 2 sections have the exact same start and end diameters.
                    // only in full merge do we have to merge sections in self.merged_sections
                    self.union(conj_idx_orig+1, conj_idx_orig) // merges conj_idx into conj_idx+1 -> head will be conj_idx+1
                    const curr_sec_last_arr = modelDimensions[idx].pop()
                    const curr_sec_rows = curr_sec_last_arr[1]
                    modelDimensions[idx-1][0][1] += curr_sec_rows
                    modelDimensions.splice(idx,1) // deleting the whole section, the right(lower) section
                    tot_rows_per_section[conj_idx] -= curr_sec_rows 
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

        self.maxWidth = max_width 
        self.modelDimensions = modelDimensions_merged
        self.subsections = subsections
        self.tot_rows_per_section = tot_rows_per_section
        return modelDimensions_merged
    },
    removeDuplicatePairs(arr){
        for (let i = arr.length-1; i-3 >= 0; i-=1){
            if (arr[i] == arr[i-2] && arr[i-1] == arr[i-3]){
                arr.splice(i-1,2)
            }
        }
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

        let numOfSegmentsArr = [6,6,6,6]
    
        if (broken){
            let subsections_idx = self.subsections.length-1
            for (let i = self.merged_sections.length-1; i >= 0; i--){
                if (self.merged_sections[i] == i){ // unmerged section
                    const num_subsections = self.subsections[subsections_idx].length
                    numOfSegmentsArr[i] = num_subsections < 6 ? Math.max(6, 2* num_subsections) : num_subsections
                    subsections_idx -= 1
                } 
            }
        }

        let points = []
        const new_pts = getCurvePointsNew(myPoints, tension, numOfSegmentsArr)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        if (!broken) return points 
        // broken points is for the result vase - to display the pattern
        else{
            let section_pts = []
            let broken_pts = []
            let broken_pts_three = []
            let lo = 0 
            let hi = 2
            let section_num = 0
            // dividing the points array into the sections of the vase (number of sections starts off as 4 but some may be merged.)
            // new_pts goes from bottom to top, ie. first section = bottom section
            // sections can only be merged up
            while (hi+3 < new_pts.length){
                if (new_pts[hi] === new_pts[hi+2] && new_pts[hi+1] === new_pts[hi+3]){
                    // only make a slice if the section is unmerged 
                    if (self.merged_sections[section_num] == section_num){
                        const temp = new_pts.slice(lo,hi+2)
                        section_pts.push(temp)
                        lo = hi + 2
                    }
                    section_num += 1
                }
                hi += 2
            }
            section_pts.push(new_pts.slice(lo,new_pts.length))

            // for each section, divide the section's points into the corresponding number of drawingSections in that section, set by the algorithm.
            for (let i=0; i<section_pts.length; i+=1){ //section_pts.length = 4
                if (self.subsections[i].length == 1){
                    broken_pts.push(section_pts[i])
                    continue
                }
                // else
                let curr_idx = 0
                for (let j=0; j<self.subsections[i].length; j+=1){
                    // self.subsections[i][j][1] = corresponding num of rows section num in modelDimensions
                    // self.tot_rows_per_section[i] = num rows in this ^ section of modelDimensions 
                    // section_pts[i]/2 - number of data pts we have; /2 because its (y,x) pairs lined up 
                    let slice_size = Math.round((self.modelDimensions[self.subsections[i][j]][1] / self.tot_rows_per_section[i]) * (section_pts[i].length/2))
                    slice_size = slice_size * 2
                    const slice = section_pts[i].slice(curr_idx,curr_idx + slice_size+2)
                    curr_idx += slice_size
                    broken_pts.push(slice)
                }
            }
            // removing duplicate pairs in the unmerged sections 
            for (let i=0; i < broken_pts.length; i++){
                self.removeDuplicatePairs(broken_pts[i])
            }
            // converting to three.js vectors
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