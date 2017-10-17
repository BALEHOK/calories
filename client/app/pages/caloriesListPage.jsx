import './caloriesListPage.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import PageTitle from 'components/pageTitle';
import DeleteButton from 'components/deleteButton';
import MealsFilter from 'components/mealsFilter';
import { setFullDate, setFullTime } from 'common/dateHelper';

import roles from 'common/userRoles';

export default class CaloriesListPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    meals: PropTypes.array.isRequired,
    mealsFilter: PropTypes.object.isRequired,
    filterMeals: PropTypes.func.isRequired,
    loadMeals: PropTypes.func.isRequired,
    addMeal: PropTypes.func.isRequired,
    editMeal: PropTypes.func.isRequired,
    deleteMeal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      dialogMeal: {}
    };

    this.dialogActions = [
      <FlatButton
        label="Cancel"
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Ok"
        primary
        onClick={this.saveMeal}
      />,
    ];
  }

  componentDidMount() {
    this.props.loadMeals();
  }

  onAddMealClick = () => {
    const newMeal = {
      text: '',
      dateTime: new Date(),
      calories: 0,
    };

    this.setState({
      dialogForEdit: false,
      dialogOpen: true,
      dialogMeal: newMeal
    });
  }

  onMealRowClick = (rowIndex) => {
    const dialogState = {
      dialogForEdit: true,
      dialogOpen: true,
      dialogMeal: this.props.meals[rowIndex].asMutable({ deep: true })
    };

    // deep: true doesn't process Date objects
    dialogState.dialogMeal.dateTime = dialogState.dialogMeal.dateTime.asMutable();

    this.setState(dialogState);
  }

  mealEditText = (event, value) => {
    this.mealEdit({ text: value });
  }

  mealEditDate = (event, value) => {
    setFullDate(value, this.state.dialogMeal.dateTime);
    this.forceUpdate();
  }

  mealEditTime = (event, value) => {
    setFullTime(value, this.state.dialogMeal.dateTime);
    this.forceUpdate();
  }

  mealEditCalories = (event, value) => {
    this.mealEdit({ calories: value });
  }

  mealEdit = (updatedProp) => {
    this.setState({
      dialogMeal: Object.assign(this.state.dialogMeal, updatedProp)
    });
  }

  deleteMeal = (event, meal) => {
    event.stopPropagation();
    this.props.deleteMeal(meal);
  }

  saveMeal = () => {
    const s = this.state;

    const meal = s.dialogMeal;
    meal.calories = +meal.calories;
    if (isNaN(meal.calories)) {
      meal.calories = 0;
    }

    if (s.dialogForEdit) {
      this.props.editMeal(meal);
    } else {
      this.props.addMeal(meal);
    }

    this.closeDialog();
  }

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const p = this.props;
    if (!p.auth.user) {
      p.history.replace('/login');
      return null;
    }

    const s = this.state;
    const { dialogForEdit, dialogOpen, dialogMeal } = s;
    return (
      <DocumentTitle title="Calories list">
        <div className="container">
          <PageTitle title="Calories list" />
          <MealsFilter filter={p.mealsFilter} onChange={p.filterMeals} />
          <div className="row meals-list">
            <Table
              selectable={false}
              onCellClick={this.onMealRowClick}
            >
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn width="40%">Text</TableHeaderColumn>
                  <TableHeaderColumn width="35%">Date</TableHeaderColumn>
                  <TableHeaderColumn width="15%">Calories</TableHeaderColumn>
                  <TableHeaderColumn width="10%"></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
                stripedRows
              >
                {this.props.meals.map((m, i) => (
                  <TableRow key={m.id || `new${i}`}>
                    <TableRowColumn width="40%">{m.text}</TableRowColumn>
                    <TableRowColumn width="35%">{m.dateTime.toLocaleString()}</TableRowColumn>
                    <TableRowColumn width="15%">{m.calories}</TableRowColumn>
                    <TableRowColumn width="10%">
                      <DeleteButton
                        className="meal-management_delete-meal"
                        onClick={e => this.deleteMeal(e, m)}
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="row meal-management_add-meal">
            <RaisedButton
              label="Add"
              primary
              onClick={this.onAddMealClick}
            />
          </div>

          <Dialog
            title={dialogForEdit ? 'Edit meal' : 'Add meal'}
            actions={this.dialogActions}
            modal={false}
            open={dialogOpen}
            onRequestClose={this.closeDialog}
          >
            <div className="meal-edit-dialog_edit-field">
              <TextField
                id="edit_meal_text"
                floatingLabelText="Text"
                value={dialogMeal.text}
                onChange={this.mealEditText}
              />
            </div>
            <div>
              <DatePicker
                id="edit_meal_date"
                autoOk
                floatingLabelText="Date"
                value={dialogMeal.dateTime}
                onChange={this.mealEditDate}
              />
              <TimePicker
                id="edit_meal_time"
                autoOk
                floatingLabelText="Time"
                format="24hr"
                value={dialogMeal.dateTime}
                onChange={this.mealEditTime}
              />
            </div>
            <div className="meal-edit-dialog_edit-field">
              <TextField
                id="edit_meal_cal"
                floatingLabelText="Calories"
                value={dialogMeal.calories}
                onChange={this.mealEditCalories}
              />
            </div>
          </Dialog>
        </div>
      </DocumentTitle>
    );
  }
}
