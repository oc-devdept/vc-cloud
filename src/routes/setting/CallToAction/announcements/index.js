import React, { Component } from "react";
import { show } from "redux-modal";
import { connect } from "react-redux";
import AnnouncementTable from "./components/AnnouncementTable";
import AnnouncementFormDialog from "./components/AnnouncementFormDialog";
import RctSectionLoader from "Components/RctSectionLoader";

// Actions
import {
  getAllAnnouncement,
  deleteAnnouncement
} from "Ducks/CallToAction/announcement";

class cta_announcements extends Component {
  constructor(props) {
    super(props);
    this.newAnnouncement = this.newAnnouncement.bind(this);
    this.editAnnouncement = this.editAnnouncement.bind(this);
    this.deleteDialog = this.deleteDialog.bind(this);
  }
  componentDidMount() {
    this.props.getAllAnnouncement();
  }

  // new annoouncemnt
  newAnnouncement() {
    this.props.show("announcement_form");
  }

  // edit
  editAnnouncement(id) {
    const toEdit = this.props.announcements.find(announce => announce.id == id);
    this.props.show("announcement_form", { edit: toEdit });
  }

  // delete
  deleteDialog(id) {
    const toDelete = this.props.announcements.find(
      announce => announce.id == id
    );
    this.props.show("alert_delete", {
      action: () => this.props.deleteAnnouncement(toDelete)
    });
  }

  render() {
    const { announcements, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <RctSectionLoader />}
        <AnnouncementTable
          data={announcements}
          newAnnouncement={this.newAnnouncement}
          editAnnouncement={this.editAnnouncement}
          deleteAnnouncement={this.deleteDialog}
        />
        <AnnouncementFormDialog />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ announcementState }) => {
  const { announcements, loading } = announcementState;
  return { announcements, loading };
};

export default connect(mapStateToProps, {
  getAllAnnouncement,
  deleteAnnouncement,
  show
})(cta_announcements);
