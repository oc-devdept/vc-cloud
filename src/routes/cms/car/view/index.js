import React from "react";
import {connect} from "react-redux";
import Rotation from 'react-rotation'
import Slider from "react-slick";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

import api from "Api";
import * as url from "Helpers/cmsURL";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NotificationManager} from "react-notifications";

class CarViewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            coverPhoto: '',
            description: '',
            exterior: [],
            interior: [],
            galleryPhoto: [],
          nav1: null,
          nav2: null,
          slider1: null,
          slider2: null
        };
    }

    componentDidMount = async () => {
        let singleData = await api.get(`/carpages/getSingleCarData/?id=${this.props.match.params.id}`);
        let data = singleData.data.data;

        let coverPhoto; let exteriors=[]; let interiors = [];
        for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].fileableType === "CarPage-Cover") { coverPhoto = data.file[i].path }
            else if (data.file[i].fileableType === "CarPage-Exterior") { exteriors.push(data.file[i]) }
            else if (data.file[i].fileableType === "CarPage-Interior") { interiors.push(data.file[i]) }
        }

        this.setState({
            name: data.name,
            coverPhoto: coverPhoto,
            description: data.description,
            exterior: exteriors,
            interior: interiors,
            galleryPhoto: data.gallery,
            nav1: this.state.slider1,
            nav2: this.state.slider2
        })
    };

    edit = () => {
        this.props.history.push(`${url.carPage}/edit/${this.props.match.params.id}`);
    };

    delete = async () => {
        let formData = new FormData();
        formData.append('editId', this.props.match.params.id);

        await api.post(`/carpages/delete`, formData);
        this.props.history.push(`${url.carPage}`);
        NotificationManager.success("Updated successfully");
    };

    render() {
        // const settingsThumbs = {
        //     slidesToShow: 2,
        //     slidesToScroll: 1,
        //     asNavFor: '.slider-for',
        //     dots: false,
        //     centerMode: true,
        //     swipeToSlide: true,
        //     focusOnSelect: true,
        // };
        const settingsMain = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        };

        return (
            <React.Fragment>
                <Helmet title="View Car" />
                <PageTitleBar
                    title="Car View Page"
                    actionGroup={{
                        mid: { label: "Edit", onClick: this.edit },
                        more: [{ label: "Delete", onClick: this.delete }]
                    }}
                />

                <div className="p-50 ml-50 mr-50 bg-white shadow shadow-lg border-rad-md border-dark">
                    <h2 className="text-muted text-center text-gray">{this.state.name}</h2>
                    <img
                        src={this.state.coverPhoto}
                        style={{width: '100%'}}
                    />

                    <div className="p-30 mt-30 mb-30" style={{width: '80%', marginLeft: '10%', backgroundColor: 'lightgray'}}>
                        { ReactHtmlParser(this.state.description) }
                    </div>

                    {
                        this.state.exterior && (
                            <div style={{width: '70%', marginLeft: '15%'}}>
                                <Rotation
                                    scroll={false}
                                    cycle={true}
                                >
                                    {
                                        this.state.exterior.map(ex => (
                                            <img src={ex.path} />
                                        ))
                                    }
                                </Rotation>
                            </div>
                        )
                    }

                    <h2 className="text-muted text-center text-gray">Gallery</h2>
                    <div className="text-center">
                        <div className="slider-wrapper">
                            <Slider
                                {...settingsMain}
                                asNavFor={this.state.nav2}
                                afterChange={slider => this.setState({slider1: slider})}
                            >

                                {this.state.galleryPhoto.map((slide) =>
                                    <div className="slick-slide" key={slide.file.id}>
                                        <img className="slick-slide-image" src={slide.file.path} />
                                        <h5 className="slick-slide-label">{slide.caption}</h5>
                                    </div>
                                )}
                            </Slider>

                            {/*<div className="thumbnail-slider-wrap">*/}
                            {/*    <Slider*/}
                            {/*        {...settingsThumbs}*/}
                            {/*        asNavFor={this.state.nav1}*/}
                            {/*        afterChange={slider => this.setState({slider2: slider})}*/}
                            {/*    >*/}

                            {/*        {this.state.galleryPhoto.map((slide) =>*/}

                            {/*            <div className="slick-slide" key={slide.file.id}>*/}
                            {/*                <img className="slick-slide-image" src={slide.file.path} />*/}
                            {/*            </div>*/}

                            {/*        )}*/}
                            {/*    </Slider>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ cmsState }) => {
    const { carState } = cmsState;
    return { carState };
};

export default connect(mapStateToProps, {

})(CarViewPage);
