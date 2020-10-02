import React, { Component } from "react";
import { connect } from "react-redux";

//sub components
import CarLists from "./components/CarLists";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Actions
import { getAllCar } from "Ducks/cms/car";
import { carNewPage } from "Helpers/cmsURL";

class CarPage extends Component {
    constructor(props) {
        super(props);
        this.newCar = this.newDeal.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    state = {
        showSummary: false
    };

    componentDidMount() {
        this.props.getAllCar();
    }

    newDeal() {
        this.props.history.push(carNewPage);
    }

    refresh() {
        this.props.getAllCar();
    }

    render() {
        const { nowShowing, tableData, loading } = this.props.carState.carList;
        return (
            <React.Fragment>
                <Helmet title="Cars" />
                <PageTitleBar
                    title={nowShowing}
                    actionGroup={{
                        add: { onClick: this.newCar },
                        more: [{ label: "Refresh List", onClick: this.refresh }]
                    }}
                />

                <CarLists tableData={tableData} loading={loading} />
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { carState } = cmsState;
    return { carState };
};

export default connect(mapStateToProps, {
    getAllCar,
})(CarPage);
