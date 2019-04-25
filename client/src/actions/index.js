//axios is used to make ajax request
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

//method 2 of writing the above
// when in arrow function we have only one statement
// then we can remove the curly braces and  the return
// keyword
// export const fetchUser = () =>
//   function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };

//refactor 2
// export const fetchUser = () => dispatch => {
//   axios
//     .get('/api/current_user')
//     .then(res => dispatch({ type: FETCH_USER, payload: res }));
// };

//refactor 3
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

//action creator to post our token to the backend server
// it will get called wheneven we get a token from the
// stripe checkout  form
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys ', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
