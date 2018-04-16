import { fetchComparison, 
  fetchComparisonSuccess, 
  fetchError, 
  pictureClick, 
  postComparison, 
  postUser,
  login, 
  loginSwitcher} from './actions';
import { values } from 'ramda';
import { User, UserRegInput, UserLogInput } from './types';

interface FetchPicture {
  id: number;
  picUrl: string
}

interface FetchComparisonResponse {
  id: number;
  text: string;
  pictures: FetchPicture[]
}

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch(`comparison/${action.id}`)
      .then(response => response.json())
      .then((data: FetchComparisonResponse): void => {
      const pics = data.pictures.map(pic => ({id: pic.id, url: pic.picUrl}))
        // here we just change the field names received from backend, ratings logic should be added in reducer
        dispatch(fetchComparisonSuccess({
          question: data.text,
          questionId: data.id,
          pictures: pics,
          initSortState: {
            sortedPart: [pics.map(p => String(p.id))[0]],
            curElPos: 1,
            picsToCompare: [pics.map(p => String(p.id))[0], pics.map(p => String(p.id))[1]],
            start: 0,
            end: 0
          }
        }))}
      )
      .catch(error => {
        console.error(error);
        dispatch(fetchError(error))
      })
  }

  if (action.type === postComparison.type) {
    const state = getState();
    const pics = values(state.comparison.pics);
    const questionId = state.comparison.questionId;
    const data = {questionnaireId: questionId, userId: 1, pictureIdScores: pics.map(x => ({pictureId: x.id, score: x.rating}))};

    fetch('/comparison-answer/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        data
      )
    });
  }

  if (action.type === postUser.type) {
    const state = getState();
    const userInp: UserRegInput = state.comparison.userRegInput;
    const user: User = {login: userInp.login, password: userInp.password, eMail: userInp.eMail}

    if (userInp.password !== userInp.confirmedPassword) {
      dispatch(fetchError("Confirmed password mismatch"))
    }
    else {
      fetch('/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(response => {
          if (response.status === 400) {
            response.text().then(
              resp => {
                if (resp.indexOf("login") != -1) {
                  dispatch(fetchError("User with such login exists"))
                }
                else if (resp.indexOf("email") != -1) {
                  dispatch(fetchError("User with such email exists"))
                }
                else {
                  dispatch(fetchError(resp))
                }
              }
            )
          }
          else {
            console.log(response.json())
          }
        })
        .catch(err =>
          console.error(err)
        );
    }
  }

  if (action.type === login.type) {
    const state = getState();
    const userInp: UserLogInput = state.comparison.userLogInput
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInp)
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(fetchError("Wrong password"))
        }
        else {
          const kek = response.headers.get('auth-token')
          console.log(kek);
          dispatch(loginSwitcher())
        }
      })
     
  }

  return next(action);
};
