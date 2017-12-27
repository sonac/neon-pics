import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from './actions';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch('api/pictures')
      .then(response => response.json())
      .then(urls =>{
        dispatch(fetchComparisonSuccess(urls.map(url => ({ url, rating: 0 }))));
        }
      )
      .catch(error =>
        dispatch(fetchComparisonError(error))
      )
  }
  else if (action.type === pictureClick.type) {
    const hcUrl = "http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg"
    var i = 0;
    for (i = 0; i < action.pics.length; i++) {
      if (action.pics[i].url == hcUrl) {
        action.pics[i].rating += 1
      }
    }
    return action.pics;
  }

  return next(action);
};
