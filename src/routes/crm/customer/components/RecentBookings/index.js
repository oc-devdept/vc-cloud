import React, { Component } from "react";
import { connect } from "react-redux";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import RecentBookingList from "./RecentBookingList";
import RecentBookingChart from "./RecentBookingChart";

// Actions
import { getRecentBookings } from "Ducks/booking";

class RecentBookings extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.custId &&
      this.props.getRecentBookings("Customer", this.props.custId);
  }
  render() {
    const { loading, listData, chartData } = this.props;
    return (
      <BgCard>
        {loading && <RctSectionLoader />}
        <div className="row align-content-start ">
          <div className="col-md-7 border-right">
            <div>
              <h4>Recent Bookings</h4>
              <RecentBookingList data={listData} />
            </div>
          </div>
          <div className="col-md-5">
            <h4>Bookings In A Glance</h4>
            <RecentBookingChart data={chartData} />
          </div>
        </div>
      </BgCard>
    );
  }
}

const mapStateToProps = ({ bookingState }) => {
  const { recentBookings } = bookingState;
  const { loading, listData, chartData } = recentBookings;
  return { loading, listData, chartData };
};

export default connect(mapStateToProps, { getRecentBookings })(RecentBookings);
