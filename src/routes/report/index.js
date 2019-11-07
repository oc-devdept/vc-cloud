import React, { Component } from "react";

// page req
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//Page Req
import ReportViews from "./components/Views";

// Side Drawer
import SideDrawer from "Components/SideDrawer";
import DrawerListCollapsible from "Components/SideDrawer/DrawerListCollapsible";
import DrawerListItem from "Components/SideDrawer/DrawerListItem";

class ReportsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "",
      nestedView: {
        sales: false,
        leads: false,
        deals: false,
        acctcust: false,
        closedDeals: false
      },
      dateRange: { startDate: null, endDate: null, focusedInput: null }
    };
    this.handleNestedView = this.handleNestedView.bind(this);
    this.onSelectView = this.onSelectView.bind(this);
  }

  handleNestedView(view) {
    this.setState({
      ...this.state,
      nestedView: {
        ...this.state.nestedView,
        [view]: !this.state.nestedView[view]
      }
    });
  }

  onSelectView(view) {
    this.setState({
      ...this.state,
      activeView: view
    });
  }

  render() {
    const { nestedView, activeView } = this.state;
    return (
      <div className="todo-dashboard">
        <Helmet>
          <title>Everyday | Reports</title>
          <meta name="description" content="Everyday Informational Reports" />
        </Helmet>
        <PageTitleBar title="Reports" />
        <div className="row">
          <div className="col-lg-2">
            <SideDrawer listHeader="Reports List">
              <DrawerListCollapsible
                title="Deals"
                state={nestedView.deals}
                openNested={() => this.handleNestedView("deals")}
              >
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("dealsByOwner")}
                  title="Deals by Owner"
                  secondary
                  selected={activeView == "dealsByOwner"}
                />
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("dealsByType")}
                  title="Deals by Type"
                  secondary
                  selected={activeView == "dealsByType"}
                />
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("dealsPipeline")}
                  title="Deals Pipeline"
                  secondary
                  selected={activeView == "dealsPipeline"}
                />
              </DrawerListCollapsible>
              <DrawerListCollapsible
                title="Closed Deals"
                state={nestedView.closedDeals}
                openNested={() => this.handleNestedView("closedDeals")}
              >
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("wonByOwner")}
                  title="Won Deals By Owner"
                  secondary
                  selected={activeView == "wonByOwner"}
                />
                {/* <DrawerListItem
                    onClickListItem={() => this.onSelectView("lostDealsReason")}
                    title="Lost Deals by Reason"
                    secondary
                    selected={activeView == "lostDealsReason"}
                  /> */}
              </DrawerListCollapsible>
              <DrawerListCollapsible
                title="Leads"
                state={nestedView.leads}
                openNested={() => this.handleNestedView("leads")}
              >
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("leadsByStatus")}
                  title="Leads by Status"
                  secondary
                  selected={activeView == "leadsByStatus"}
                />
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("leadsByOwner")}
                  title="Leads by Owner"
                  secondary
                  selected={activeView == "leadsByOwner"}
                />
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("leadsBySource")}
                  title="Leads by Source"
                  secondary
                  selected={activeView == "leadsBySource"}
                />
              </DrawerListCollapsible>
              <DrawerListCollapsible
                title={"Accounts & Customers"}
                state={nestedView.acctcust}
                openNested={() => this.handleNestedView("acctcust")}
              >
                <DrawerListItem
                  onClickListItem={() => this.onSelectView("topSpenderAccount")}
                  title="Top Spender Report (Accounts)"
                  secondary
                  selected={activeView == "topSpenderAccount"}
                />
                <DrawerListItem
                  onClickListItem={() =>
                    this.onSelectView("topSpenderCustomer")
                  }
                  title="Top Spender Report (Customers)"
                  secondary
                  selected={activeView == "topSpenderCustomer"}
                />
              </DrawerListCollapsible>

              <DrawerListItem
                onClickListItem={() => this.onSelectView("individual")}
                title="Individual"
                selected={activeView == "individual"}
              />
            </SideDrawer>
            {/* </List>
            </Drawer> */}
          </div>
          <div className="col-lg-10">
            <ReportViews componentToRender={activeView} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsComponent;
