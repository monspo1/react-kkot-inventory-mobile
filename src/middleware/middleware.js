//########################################################################
//## src/js/middleware/index.js
//## 미들웨어는 액션이 디스패치되어서 리듀서에 도달하기 전에 실행되는 함수입니다. 
//## 이를 통해 액션을 변형하거나 비동기 작업을 처리하는 등의 추가 작업을 수행할 수 있습니다.
//########################################################################
import { 
  RESTAPI_SEARCH_ITEM_RETURNED,
  SEARCH_ITEM_RETURNED_ERROR,
  SEARCH_ITEM_RETURNED_SUCCESS, 
} from '../actions/action-types'

export const mainMiddleware = (storeAPI) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(storeAPI.dispatch, storeAPI.getState);
  }

  switch(action.type){
    case RESTAPI_SEARCH_ITEM_RETURNED:
      if(action.payload.data.length > 0) {
        storeAPI.dispatch({ type: SEARCH_ITEM_RETURNED_SUCCESS, response: action })
      } else {
        storeAPI.dispatch({ type: SEARCH_ITEM_RETURNED_ERROR, response: action })
      }
      break;
    default:
      next(action);
      break;
  }
}