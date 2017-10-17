import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { ajax } from 'common/ajax';
import { convertToLocaleDate } from 'common/dateHelper';

import * as actionTypes from 'actions/types';
import * as actionCreators from 'actions/creators';

const getMealsEpic = (action$, store) =>
  action$.ofType(actionTypes.loadMeals)
    .mergeMap((action) => {
      let { skip, limit, userId } = action.payload;
      skip = skip || 0;
      limit = limit || 100;

      let url = `/meals/search/${skip}/${limit}`;
      if (userId) {
        url += `/${userId}`;
      }

      const mealsFilter = store.getState().meals.filter;

      return ajax.post(url, mealsFilter).then(r => r.json())
    })
    .catch(() => Observable.of([]))
    .do(meals => meals.forEach(
      m => m.dateTime = new Date(m.dateTime)
    ))
    .map(actionCreators.mealsLoaded);

const filterMealsEpic = (action$) =>
  action$.ofType(actionTypes.filterMeals)
    .mapTo(actionCreators.loadMeals());

const addMealEpic = (action$) =>
  action$.ofType(actionTypes.addMeal)
    .mergeMap((action) => ajax.post('/meals', action.payload))
    .catch((er) => Observable.of(er))
    .map(() => actionCreators.loadMeals());

const editMealEpic = (action$) =>
  action$.ofType(actionTypes.editMeal)
    .mergeMap((action) => ajax.put('/meals', action.payload))
    .catch((er) => Observable.of(er))
    .map(() => actionCreators.loadMeals());

const deleteMealEpic = (action$) =>
  action$.ofType(actionTypes.deleteMeal)
    .mergeMap((action) => ajax.delete(`/meals/${action.payload.id}`))
    .catch((er) => Observable.of(er))
    .map(() => actionCreators.loadMeals());

export default combineEpics(
  getMealsEpic,
  filterMealsEpic,
  addMealEpic,
  editMealEpic,
  deleteMealEpic
);
