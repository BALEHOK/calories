import Immutable from 'seamless-immutable';
import Reducer from './baseReducer';
import * as actionTypes from 'actions/types';

class MealsReducer extends Reducer {
  constructor() {
    super();

    this.defaultState = Immutable({
      filter: {
        dateFrom: null,
        dateTo: null,
        timeFrom: null,
        timeTo: null
      },
      items: []
    });

    this.actionMap = {
      [actionTypes.mealsLoaded]: 'mealsLoaded',
      [actionTypes.addMeal]: 'addMeal',
      [actionTypes.editMeal]: 'editMeal',
      [actionTypes.deleteMeal]: 'deleteMeal',
      [actionTypes.filterMeals]: 'filterMeals',
    };
  }

  mealsLoaded(state, action) {
    return state.set('items', action.payload);
  }

  addMeal(state, action) {
    return state.set('items', state.items.concat(action.payload));
  }

  editMeal(state, action) {
    const editedMeal = action.payload;
    return state.set('items', state.items.map(m => m.id === editedMeal.id ? editedMeal : m));
  }

  deleteMeal(state, action) {
    const deletedMealId = action.payload.id;
    return state.set('items', state.items.filter(m => m.id !== deletedMealId));
  }

  filterMeals(state, action) {
    const filter = action.payload;
    return state.set('filter', filter);
  }
}

export default new MealsReducer().getReducerFn();
