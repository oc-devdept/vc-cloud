import React, { PureComponent } from "react";
import Button from "Components/Inventory/Button";

class PublishModal extends PureComponent {
    constructor(props) {
        super(props);
    }

    publish = (pn) => {
      this.props.publishArticle(pn);
    };

    render() {
        return (
            <div className="d-flex" style={{ flexDirection: "column" }}>
                <h3 className="text-muted text-center text-gray mb-20 mt-20">Do you want to publish or unpublish your Article?</h3>

                <div className="d-flex flex justify-content-around">
                    <Button
                        divStyle={{
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        _Function={() => this.publish('unpublish')}
                        title="UnPublish"
                    />

                    <Button
                        divStyle={{
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        _Function={() => this.publish('publish')}
                        title="Publish"
                    />
                </div>
            </div>
        );
    }
}

export default PublishModal;
