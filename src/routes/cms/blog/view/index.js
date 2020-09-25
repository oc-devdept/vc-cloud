import React, {Component} from "react";
import { connect } from "react-redux";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//css
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

//actions
import { getSingleBlog } from "Ducks/cms/blog";
import * as url from "Helpers/cmsURL";
import api from "Api";

import ReactHtmlParser from "react-html-parser";
import {NotificationManager} from "react-notifications";

class BlogViewPage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getSingleBlog(id);
    }

    edit = () => {
        this.props.history.push(`${url.blogPage}/edit/${this.props.match.params.id}`);
    };

    delete = async () => {
        await api.delete(`carblogs/deleteBlog/${this.props.match.params.id}`);
        NotificationManager.success('Successfully deleted!');
        this.props.history.push(`${url.blogPage}`);
    };

    render() {
        const { singleContent } = this.props.blogState;
        return (
            <React.Fragment>
                <Helmet title="View Blog" />
                <PageTitleBar
                    title="View Blog"
                    actionGroup={{
                        mid: { label: "Edit", onClick: this.edit },
                        more: [{ label: "Delete", onClick: this.delete }]
                    }}
                />

                <div className="ml-50 mr-50 bg-white shadow shadow-lg border-rad-md border-dark"
                     style={{
                         boxShadow: `0px 0px 5px grey`,
                         padding: 80
                     }}
                >
                    { ReactHtmlParser(singleContent) }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ cmsState }) => {
    const { blogState } = cmsState;
    return { blogState };
};

export default connect(mapStateToProps, {
    getSingleBlog
})(BlogViewPage)
