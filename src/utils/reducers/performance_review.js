import { ActionTypes } from "utils/actions";
import { copyArray } from "../helpers";

const initial_state = {
  performance_reviews: [],
}

export default function changeState(state = initial_state, action) {
  switch (action.type) {
    case ActionTypes.ADD_PERFORMANCE_REVIEW:
      return { ...state, performance_reviews: [...state.performance_reviews, action.payload] };
    case ActionTypes.FETCH_PERFORMANCE_REVIEWS:
      return { ...state, performance_reviews: action.payload }
    case ActionTypes.FETCH_PERFORMANCE_REVIEWS_BY_REVIEWER:
      return { ...state, performance_reviews: action.payload }
    default:
      return state;
  }
}
