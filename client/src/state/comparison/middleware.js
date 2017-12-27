import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from './actions';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch('comparison/1')
      .then(response => response.json())
      .then(urls => {
        const pictures = urls["pictures"]
        const question = urls["text"]
        console.log(pictures)
        dispatch(fetchComparisonSuccess(question, pictures.map(pic => ({ id: pic.id, url: pic.picUrl, rating: 0 }))));
        }
      )
      .catch(error => {
        throw error
        dispatch(fetchComparisonError(error))}
      )
  }
  else if (action.type === pictureClick.type) {
    //const hcUrl = "http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg"
    console.log(action.url)
    var i = 0;
    for (i = 0; i < action.pics.length; i++) {
      if (action.pics[i].url == action.url) {
        action.pics[i].rating += 1
      }
    }
    return action.pics;
  }

  return next(action);
};
