import { observer } from "mobx-react";
import React, {useState, useRef, useEffect} from 'react';

const [varr, setVarr] = useState(false);

const counter = {
    "#FFFFFF" : 0,
}

export default observer(counter);