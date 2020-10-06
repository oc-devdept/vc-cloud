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
            categoryName: '',
            coverPhoto: '',
            description: '',
            exterior: [],
            interior: [],
            galleryPhoto: [],
          nav1: null,
          nav2: null
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
            categoryName: data.categoryName,
            coverPhoto: coverPhoto,
            description: data.description,
            exterior: exteriors,
            interior: interiors,
            galleryPhoto: data.gallery,
            nav1: this.slider1,
            nav2: this.slider2
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
        let length = this.state.galleryPhoto.length;

        const settingsMain = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        };

        const settingsThumbs = {
            slidesToShow: length,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            swipeToSlide: true,
            focusOnSelect: true,
        };

        return (
            <React.Fragment>
                <Helmet title="View Car" />
                <PageTitleBar
                    title={`Car View Page  (${this.state.categoryName})`}
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

                    <h2 className="text-muted text-center text-gray mt-30">Description</h2>
                    <div className="p-30 mt-30 mb-30" style={{width: '100%', marginLeft: '0%', backgroundColor: 'lightgray'}}>
                        { ReactHtmlParser(this.state.description) }
                    </div>

                    {
                        this.state.exterior && (
                                <section style={{
                                    backgroundColor: 'black',
                                    padding: '20px 0px',
                                    marginTop: 30
                                }}>
                                    <div style={{width: '70%', marginLeft: '15%'}}>
                                        <div style={{backgroundColor: 'transparent', padding: '20px 0px', color: 'white'}} align="center">
                                            <h2>360&deg; VIEWING</h2>
                                        </div>

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
                                </section>
                        )
                    }

                    <h2 className="text-muted text-center text-gray mt-30">Gallery</h2>
                    <div className="text-center">
                            <Slider
                                {...settingsMain}
                                asNavFor={this.state.nav2}
                                ref={slider => (this.slider1 = slider)}
                            >

                                {this.state.galleryPhoto.map((slide) =>
                                    <div className="slick-slide" key={slide.file.id}>
                                        <img className="slick-slide-image" src={slide.file.path} style={{height: 400}} />
                                        <h3 className="slick-slide-label">{slide.caption}</h3>
                                    </div>
                                )}
                            </Slider>

                            <div className="thumbnail-slider-wrap" style={{marginTop: -15}}>
                                <Slider
                                    {...settingsThumbs}
                                    asNavFor={this.state.nav1}
                                    ref={slider => (this.slider2 = slider)}
                                >

                                    {this.state.galleryPhoto.map((slide) =>

                                        <div className="slick-slide" key={slide.file.id}>
                                            <img className="slick-slide-image" src={slide.file.path} style={{height: 120}} />
                                        </div>

                                    )}
                                </Slider>
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
