export const SET_LOADER_STATUS = 'SET_LOADER_STATUS'
export const SET_MASTER_BOX_ITEMS = 'SET_MASTER_BOX_ITEMS'
export const SET_BOXES_DATA = 'SET_BOXES_DATA'
export const SET_CUR_BOX_INITIAL = 'SET_CUR_BOX_INITIAL';
export const SET_CUR_BOX_ITEMS = 'SET_CUR_BOX_ITEMS';
export const SET_CUR_BOX_ID = 'SET_CUR_BOX_ID';

export function setLoaderStatus (payload) {
    return  { type: SET_LOADER_STATUS, payload };
};

export function setNewBoxInitial (payload) {
    return  { type: SET_CUR_BOX_INITIAL, payload };
}

export function setMasterBoxItems (payload) {
    return  { type: SET_MASTER_BOX_ITEMS, payload };
};

export function setBoxesData (payload) {
    return  { type: SET_BOXES_DATA, payload };
};

export function setBoxItems (payload) {
    // console.log('action - setBoxItems : ', payload)
    return  { type: SET_CUR_BOX_ITEMS, payload };
};

export function setCurBoxId (payload) {
    return  { type: SET_CUR_BOX_ID, payload };
};



