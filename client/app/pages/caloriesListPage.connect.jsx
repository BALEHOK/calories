import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CaloriesListPage from './caloriesListPage';
import { loadMeals, addMeal, editMeal, deleteMeal, filterMeals } from 'actions/creators';

function mapStateToProps(state) {
  return { auth: state.auth, meals: state.meals.items, mealsFilter: state.meals.filter };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMeals, addMeal, editMeal, deleteMeal, filterMeals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CaloriesListPage);
