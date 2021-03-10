import { subActions } from "../Reducers/SubscriberReducer";
import firebase from "firebase";
import axios from "axios";

export function loadSubToken() {
  return (dispatch) => {
    dispatch({ type: subActions.getSubToken });

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((res) => {
        dispatch({ type: subActions.getSubTokenSuccess, payload: res });
      })
      .catch((err) => {
        dispatch({ type: subActions.getSubTokenFailed, payload: err });
      });
  };
}

export function loadProfileData() {
  return (dispatch) => {
    dispatch({ type: subActions.getSubProfileData });
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((res) => {
        var tokenId = res;
        axios
          .post(`http://hit-activity-tracking-backend.herokuapp.com/subData/getProfileData`, { tokenId })
          .then((res) => {
            dispatch({
              type: subActions.getSubProfileDataSuccess,
              payload: res.data,
            });
          })
          .catch((err) => {
            dispatch({
              type: subActions.getSubProfileDataFailed,
              payload: err,
            });
          });
      })
      .catch((err) => {
        dispatch({ type: subActions.getSubTokenFailed, payload: err });
      });
  };
}

export function fetchTrainers(search) {
  return (dispatch) => {
    axios
      .get(`http://hit-activity-tracking-backend.herokuapp.com/subscriber/trainers/${search}`)
      .then((res) => {
        dispatch({ type: subActions.getSearchResult, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: subActions.getSearchResultFailed, payload: err });
      });
  };
}
export function addWeight(weight) {
  return (dispatch) => {
    axios
      .put(`http://hit-activity-tracking-backend.herokuapp.com/subscriber/addWeight/${weight.id}`, weight)
      .then((res) => {
        dispatch({ type: subActions.updateWeight, payload: "Weight Added" });
      })
      .catch((err) => {
        dispatch({ type: subActions.updateWeightFailed, payload: err });
      });
  };
}
export function clearState() {
  return (dispatch) => {
    dispatch({ type: subActions.clearState });
  };
}

export function fetchTrainer(name) {
  return (dispatch) => {
    axios
      .get(
        `http://hit-activity-tracking-backend.herokuapp.com/subscriber/getTrainer/${name.first}/${name.last}`
      )
      .then((res) => {
        dispatch({ type: subActions.fetchedTrainer, payload: res.data[0] });
      })
      .catch((err) => {
        dispatch({ type: subActions.fetchedTrainerFailed, payload: err });
      });
  };
}

export function subscribe(subPair) {
  return (dispatch) => {
    axios
      .put(`http://hit-activity-tracking-backend.herokuapp.com/subscriber/subcribeToTrainer/`, subPair)
      .then((res) => {
        dispatch({
          type: subActions.subscribe,
          payload: "You are now Subscribed",
        });
      })
      .catch((err) => {
        dispatch({ type: subActions.subscribeFailed, payload: err });
      });
  };
}
export function getWeights(id) {
  return (dispatch) => {
    axios
      .get(`http://hit-activity-tracking-backend.herokuapp.com/subscriber/getWeights/${id}`)
      .then((res) => {
        const newList = [];
        for (let i = 0; i < res.data.length; i++) {
          const obj = {
            x: Number(res.data[i].date),
            y: Number(res.data[i].weight),
          };

          newList.push(obj);
        }

        dispatch({ type: subActions.getWeights, payload: newList });
      })
      .catch((err) => {
        dispatch({ type: subActions.getWeightsFailed, payload: err });
      });
  };
}

export function getRoutines(id) {
  return (dispatch) => {
    axios
      .get(`http://hit-activity-tracking-backend.herokuapp.com/subscriber/getRoutines/${id}`)
      .then((res) => {
        dispatch({ type: subActions.getRoutines, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: subActions.getRoutinesFailed, payload: err });
      });
  };
}
