import { values } from 'ramda';
import * as Cookies from 'universal-cookie';
import { User, 
  UserRegInput, 
  UserLogInput, 
  Questionnaire, 
  QuestionnaireSeq, 
  EnhancedQuestionnaire, 
  Picture,
  Question } from './types';
import { fetchComparison, 
  fetchComparisonSuccess, 
  fetchError, 
  pictureClick, 
  postComparison, 
  postUser,
  login,
  logout, 
  loginSwitcher,
  checkToken,
  checkTokenSuccess,
  postNewQuestionnaire,
  postNewQuestSuccess,
  postNewQuestError,
  fetchAllQuestionnaires,
  fetchAllQuestionnairesSuccess,
  updateCurrentLoginInput,
  fetchAnsweredQuestions,
  fetchAnsweredQuestionsSuccess,
  fetchAnswerResult,
  fetchAnswerResultSuccess} from './actions';

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
    fetch(`/comparison/${action.id}`, {
      credentials: "include"
    })
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
    const data = {questionnaireId: questionId, pictureIdScores: pics.map(x => ({pictureId: x.id, score: x.rating}))};

    console.log(data);

    fetch('/comparison-answer/', {
      credentials: 'include',
      method: 'PUT',
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
    const userClean = {login: userInp.login, password: userInp.password, eMail: userInp.eMail}

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
        body: JSON.stringify(userClean)
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
            const loginInput: UserLogInput = {login: userInp.login, password: userInp.password} 
            dispatch(updateCurrentLoginInput(loginInput)).then(
              dispatch(login()).then(
                window.location.href = '/'
              )
            )
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
          const token = response.headers.get('auth-token')
          const cookies = new Cookies();
          cookies.set('auth-token', token, { path: '/' });
          window.location.reload();
          const logW = state.comparison.showLogin;
          if (!logW) {
            dispatch(loginSwitcher())
          }
        }
      })
     
  }

  if (action.type === checkToken.type) {
    fetch("/validate", {
      credentials: "include"
    })
    .then( response => {
      if (response.status === 200) {
        response.json()
        .then( data => {
          const usr: User = data
          dispatch(checkTokenSuccess({currentUser: usr}))
        })
      }
    })
  }

  if (action.type === logout.type) {
    const cookie = new Cookies();
    cookie.remove('auth-token');
  }

  if (action.type === postNewQuestionnaire.type) {
    const state = getState();
    const pics = {pics: state.comparison.picInputs};
    const questName = state.comparison.picInpName;

    fetch("/pictures", {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pics)
    })
    .then(response => 
        response.json())
      .then(data => {
        const newQuest: Questionnaire = {text: questName, pictureIds: data}
        fetch("/comparison", {
          method: 'POST',
          credentials: "include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newQuest)
        })
        .then(response => {
            if (response.status === 201) {response.json()
              .then((_): void => {
                dispatch(postNewQuestSuccess())
                window.location.href = '/';
              })
              .catch(error => {
                console.error(error);
                dispatch(postNewQuestError(error))
            })
          } 
        })
      })
  }

  if (action.type === fetchAllQuestionnaires.type) {
    fetch('/comparison-all')
    .then(response => 
      response.json())
      .then(data => {
        const quests: QuestionnaireSeq = data.map(q => {
          const t: EnhancedQuestionnaire = {id: q.id, question: q.text, pics: q.pictures.map(p => {
            const pic: Picture = {id: p.id, url: p.picUrl, rating: 0}
            return pic
          })
        }
        return t
      })
      dispatch(fetchAllQuestionnairesSuccess({quests}))
    })
    .catch(error => {
      console.error(error);
      dispatch(fetchError(error))
    })
  }

  if (action.type === fetchAnsweredQuestions.type) {
    fetch('/comparison-questions', {
      credentials: "include"
    })
    .then(response => 
      response.json())
      .then(data => {
        const questions: Array<Question> = data.map(q => ({id: q.id, text: q.text}))
        console.log(questions)
        dispatch(fetchAnsweredQuestionsSuccess({questions}))
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchError(err))
      })
  }

  if (action.type === fetchAnswerResult.type) {
    fetch(`/comparison-answer/${action.id}`, {
      credentials: "include"
    })
    .then(resp => 
      resp.json())
      .then(data => {
        console.log(data);
        const pics: Array<Picture> = data.pictureScores.map(p => ({id: p.id, url: p.picUrl, rating: p.score}))
        dispatch(fetchAnswerResultSuccess({results: pics}))
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchError(err))
      })
  }

  return next(action);
};