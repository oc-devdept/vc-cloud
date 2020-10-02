import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import BlogLists from "./components/BlogLists";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Actions
import { getAllBlog } from "Ducks/cms/blog";
import { blogNewPage } from "Helpers/cmsURL";

class CarPage extends Component {
    constructor(props) {
        super(props);
        this.newBlog = this.newBlog.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    state = {
        showSummary: false
    };

    componentDidMount() {
        this.props.getAllBlog();
    }

    newBlog() {
        this.props.history.push(blogNewPage);
    }

    refresh() {
        this.props.getAllBlog();
    }

    render() {
        const { nowShowing, tableData, loading } = this.props.blogState.blogList;
        return (
            <React.Fragment>
                <Helmet title="Cars" />
                <PageTitleBar
                    title={nowShowing}
                    actionGroup={{
                        add: { onClick: this.newBlog },
                        more: [{ label: "Refresh List", onClick: this.refresh }]
                    }}
                />

                <BlogLists tableData={tableData} loading={loading} />
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { blogState } = cmsState;
    return { blogState };
};

export default connect(mapStateToProps, {
    getAllBlog
})(CarPage);
