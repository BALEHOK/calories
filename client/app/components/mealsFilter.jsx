import './mealsFilter.scss';

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import TimePicker from 'material-ui/TimePicker';

export default class MealsFilter extends React.PureComponent {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onDateFromChanged = (e, value) => {
    this.onFilterCahnged('dateFrom', value);
  }

  onDateToChanged = (e, value) => {
    this.onFilterCahnged('dateTo', value);
  }

  onTimeFromChanged = (e, value) => {
    this.onFilterCahnged('timeFrom', value);
  }

  onTimeToChanged = (e, value) => {
    this.onFilterCahnged('timeTo', value);
  }

  onFilterCahnged(prop, value) {
    const filter = this.props.filter.set(prop, value);
    this.props.onChange(filter);
  }

  onClear = () => {
    this.props.onChange({
      dateFrom: null,
      dateTo: null,
      timeFrom: null,
      timeTo: null
    });
  }

  render() {
    let { dateFrom, dateTo, timeFrom, timeTo } = this.props.filter;

    dateFrom = dateFrom && dateFrom.asMutable();
    dateTo = dateTo && dateTo.asMutable();
    timeFrom = timeFrom && timeFrom.asMutable();
    timeTo = timeTo && timeTo.asMutable();

    return (
      <div className="row meals-filter">
        <DatePicker
          id="meals-filter_date-from"
          className="meals-filter_date-from"
          autoOk
          floatingLabelText="Filter by date from"
          value={dateFrom}
          onChange={this.onDateFromChanged}
        />
        <DatePicker
          id="meals-filter_date-to"
          className="meals-filter_date-to"
          autoOk
          floatingLabelText="date to"
          value={dateTo}
          onChange={this.onDateToChanged}
        />
        <TimePicker
          id="meals-filter_time-from"
          className="meals-filter_time-from"
          autoOk
          floatingLabelText="time from"
          format="24hr"
          value={timeFrom}
          onChange={this.onTimeFromChanged}
        />
        <TimePicker
          id="meals-filter_time-to"
          className="meals-filter_time-to"
          autoOk
          floatingLabelText="time to"
          format="24hr"
          value={timeTo}
          onChange={this.onTimeToChanged}
        />
        <div className="meals-filter_clear">
          <IconButton
            iconClassName="material-icons"
            onClick={this.onClear}
          >
            clear
          </IconButton>
        </div>
      </div>
    );
  }
}
