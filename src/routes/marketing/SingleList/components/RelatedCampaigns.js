import React, { PureComponent, Component } from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

import { connect } from "react-redux";
//sub components
import { show } from "redux-modal";
import { listOptions } from "Helpers/helpers";
//Page req
import RecordsList from "Components/RecordsList";

// import editFilled from "@iconify/icons-ant-design/edit-filled";
// import FollowupForm from "../../components/FollowUp/Forms/FollowupForm";
// icon
import whatsappIcon from "@iconify/icons-logos/whatsapp";
import googleGmail from "@iconify/icons-ic/round-email";
import moment from "moment";
import { Icon, InlineIcon } from "@iconify/react";
import { IconButton } from "@material-ui/core";
// import addFilled from "@iconify/icons-carbon/add-filled";
import roundStars from "@iconify/icons-ic/round-stars";

// import {
//   getFollowUps,
//   getCrmSummary,
//   getFollowData,
//   getFilterFollowup,
// } from "Ducks/widget";
// import { deleteFollowUp, editFollowup } from "Ducks/followUp";

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;

      for (let a = 0; a < list.length; a++) {
        let value = list[a];
        filter.push({ [property]: value });
      }
    }
  }
  return filter;
}

// const options = Object.assign({}, listOptions);

class RelatedCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Customers: [],
      loading: true,
      data: null,
      upcoming: false,
      completed: true,
    };
  }
  componentDidMount() {}

  render() {
    const { tableData } = this.props;

    const columns = [
      {
        label: "Type",
        name: "type",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            //   return moment(value).format("DD MMM YYYY | HH:mm");
            // return 0;
            if (value.name) {
              return <Icon icon={googleGmail} color="#FF8B19" />;
            } else if (value.waCampaignName) {
              return <Icon icon={whatsappIcon} />;
            }
          },
        },
      },
      {
        label: "Date Published",
        name: "date",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            if (value.name) {
              return <div>{moment(value.createDate).format("DD/MM/YYYY")}</div>;
            } else if (value.waCampaignName) {
              return <div>{moment(value.createDate).format("DD/MM/YYYY")}</div>;
            }
            // return 0;
          },
        },
      },
      {
        label: "Name of Marketing Campaign",
        name: "title",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            if (value.name) {
              return value.name;
            } else if (value.waCampaignName) {
              return value.waCampaignName;
            }
          },
        },
      },
      //   {
      //     label: "Total Impressions",
      //     name: "followupableType",
      //     options: {
      //       customBodyRender: (value, tableMeta) => {
      //         return 0;
      //       },
      //     },
      //   },
      //   {
      //     label: "Total Clicks",
      //     name: "resultId",
      //     options: {
      //       customBodyRender: (value, tableMeta) => {
      //         return 0;
      //       },
      //     },
      //   },
      //   {
      //     label: "Call Type",
      //     name: "typeId",
      //     options: {
      //       customBodyRender: (value, tableMeta) => {
      //         return value;
      //       },
      //     },
      //   },
    ];

    return (
      <div>
        {/* {tableData.data && ( */}

        <RecordsList
          columns={columns}
          // data={tableData}
          data={tableData.map((item) => {
            return [item, item, item];
          })}
          options={listOptions}
        />

        {/* {console.log("IN FOLLOW UP PAGHE")}
        {console.log(this.props)} */}

        {/* <FollowupForm /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { name } = authState;

  return { name };
};

export default connect(mapStateToProps, {
  show,
})(RelatedCampaigns);
