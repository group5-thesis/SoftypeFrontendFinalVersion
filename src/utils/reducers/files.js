import { ActionTypes } from "utils/actions";
const initial_state = {
    documents: [],
    images: [],
    videos: [],
    others: []
}

export default function changeState(state = initial_state, { type, payload }) {
    const { FILE_DOCUMENTS, FILE_IMAGES, FILE_VIDEOS, FILE_OTHERS } = ActionTypes
    switch (type) {
        case FILE_DOCUMENTS:
            return { ...state, documents: payload };
        case FILE_IMAGES:
            return { ...state, images: payload };
        case FILE_VIDEOS:
            return { ...state, videos: payload };
        case FILE_OTHERS:
            return { ...state, others: payload };
        default:
            return state;
    }
}
