import { 
    SET_LOADER_STATUS, SET_MASTER_BOX_ITEMS, SET_BOXES_DATA, SET_CUR_BOX_INITIAL,
    SET_CUR_BOX_ITEMS, SET_CUR_BOX_ID,
} from '../actions/action-types';
// import { tempDataForItemList } from '../constants/constants';

const initialState = { 
    loading: false,
    masterBoxItems: [],
    boxesData: [],
    curBoxItems: [], // tempDataForItemList,
    curBoxInitial: '',
    curBoxId: '',
    curBoxSelected: {},
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_LOADER_STATUS:
            return Object.assign({}, { ...state, loading: action.payload });

        case SET_MASTER_BOX_ITEMS:
            // console.log('SET_MASTER_BOX_ITEMS: ', action.payload);
            return Object.assign({}, { ...state, 
                masterBoxItems: action.payload,
                loading: false,
            });

        case SET_BOXES_DATA:
            return Object.assign({}, { ...state, 
                boxesData: action.payload,
                loading: false,
            });
        
        case SET_CUR_BOX_INITIAL: 
            return Object.assign({}, { ...state, 
                curBoxInitial: action.payload,
                loading: false,
            });

        case SET_CUR_BOX_ITEMS:
            // console.log('Reducer - curBoxItems : ', action.payload)
            return Object.assign({}, { ...state, 
                curBoxItems: action.payload,
                loading: false,
            });

        case SET_CUR_BOX_ID: 
            // console.log('curBoxId: ', action.payload)
            return Object.assign({}, { ...state, 
                curBoxId: action.payload,
                loading: false,
            });

        default: 
            return state;
    }
}

export default rootReducer;