import React, { Component } from "react";

// page req
import Helmet from "Components/Helmet";
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
    const renderList = [
      {
        title: "Deals",
        stateName: "deals",
        nestedList: [
          { title: "Deals By Owner", stateName: "dealsByOwner" },
          { title: "Deals By Type", stateName: "dealsByType" },
          { title: "Deals Pipeline", stateName: "dealsPipeline" }
        ]
      },
      {
        title: "Closed Deals",
        stateName: "closedDeals",
        nestedList: [{ title: "Won Deals By Owner", stateName: "wonByOwner" }]
      },
      // {
      //   title: "Leads",
      //   stateName: "leads",
      //   nestedList: [
      //     { title: "Leads By Status", stateName: "leadsByStatus" },
      //     { title: "Leads By Owner", stateName: "leadsByOwner" },
      //     { title: "Leads By Source", stateName: "leadsBySource" }
      //   ]
      // },
      {
        title: "Top Spenders",
        stateName: "acctcust",
        nestedList: [
          {
            title: "Top Spender Report (Accounts)",
            stateName: "z"
          },
          {
            title: "Top Spender Report (Customers)",
            stateName: "topSpenderCustomer"
          }
        ]
      },
      {
        title: "Individual Report",
        stateName: "individual",
        nestedList: []
      }
    ];
    const { nestedView, activeView } = this.state;

    return (
      <div className="todo-dashboard">
        <Helmet title="Reports" metaDesc="Everyday Informational Reports" />
        <PageTitleBar title="Reports" />
        <div className="row">
          <div className="col-lg-2">
            <SideDrawer listHeader="Reports List">
              {renderList.map((list, key) =>
                list.nestedList.length > 0 ? (
                  <DrawerListCollapsible
                    key={key}
                    title={list.title}
                    state={nestedView[list.stateName]}
                    openNested={() => this.handleNestedView(list.stateName)}
                  >
                    {list.nestedList.map((nest, index) => (
                      <DrawerListItem
                        key={index}
                        onClickListItem={() =>
                          this.onSelectView(nest.stateName)
                        }
                        title={nest.title}
                        secondary
                        selected={activeView == nest.stateName}
                      />
                    ))}
                  </DrawerListCollapsible>
                ) : (
                  <DrawerListItem
                    key={key}
                    onClickListItem={() => this.onSelectView(list.stateName)}
                    title={list.title}
                    selected={activeView == list.stateName}
                  />
                )
              )}
            </SideDrawer>
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
