import React, {PureComponent, useState} from "react";
import { PropTypes, object } from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from "Components/Dropzone";


import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'
import BlobImage from 'Components/Inventory/BlobImage'



const Index = ({_AddVariantValues}) => {

    const [form, setState] = useState({
        name : '',
        price: '',
        isDefault: false,
     
        // Display ThumbNail
        files: [],

        // Secondary Photos
        images :[],
        imagesString :[],
    });

    const _HandleProductDetailValue = (e, element) => {
        setState(form => ({ ...form, [element]: e }));
    };

    const _HandleCheckBox = (e) => {
        setState(form => ({ ...form, [e.target.name]: !form[e.target.name]}));
    };

    
    const handleUpload = file => {
        setState(form => ({ ...form, files: file}));
    };
  
    const removeFile = (file) => {
        const CloneArray = Array.from(form.files)
        const index = CloneArray.indexOf(file);
        const files = CloneArray.slice(0);
        files.splice(index, 1)
        setState(form => ({ ...form, files: files}));
    }

    const removeNewImages = async(index) => {

        // Needs to add to both arrays
        let CloneImages = form.images.slice(0)
        let CloneImagesStrings = form.imagesString.slice(0)
        
        CloneImages = CloneImages.filter((e, indexes) => indexes!=index)
        CloneImagesStrings = CloneImagesStrings.filter((e, indexes) => indexes!=index)

        setState(form => ({ ...form, images: CloneImages, imagesString: CloneImagesStrings}));
    }

    const handleNewImagesUpload = file => {
        // Needs to add to both arrays
        let CloneImages = form.images.slice(0)
        let CloneImagesStrings = form.imagesString.slice(0)
        
        const item = URL.createObjectURL(file[0])
        CloneImages = CloneImages.concat(file)
        CloneImagesStrings = CloneImagesStrings.concat(item)

        setState(form => ({ ...form, images: CloneImages, imagesString: CloneImagesStrings}));

    };

    const _Add = () => {
        _AddVariantValues({name: form.name, isDefault: form.isDefault, price: form.price}, form.files, form.images)
    }

   
    return (
        <div className="d-flex" style={{flex: 1, flexDirection:"column", padding :20}}>

            <div className="d-flex flex-row" style={{paddingBottom: 20,}}>
                <div className="d-flex flex-column" style={{justifyContent:"space-between", flex:0.5, marginRight: 30}}>
                    
                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="NAME OF THE VARIANT ITEM"
                        placeholder="e.g Enter a new product variant item name"
                        value={form.name}
                        element={'name'}
                        _HandleProduct={_HandleProductDetailValue}
                    />   
            
                    <Input
                        divStyle={{width: '100%'}}
                        title="PRICE"
                        placeholder="e.g Enter a price for the item"
                        value={form.price}
                        element={'price'}
                        _HandleProduct={_HandleProductDetailValue}
                    />  

                    <div className="d-flex flex-row" style={{width: '100%'}}>                        
                        <StaticName
                            title="MAKE THE ITEM DEFAULT"
                        />
                        
                        <Checkbox
                            edge="end"
                            onChange={_HandleCheckBox}
                            checked={form.isDefault}
                            name="isDefault"
                        /> 
                    </div>

                </div>

                <div className="d-flex flex-row" style={{flex: 0.5 }}>
                    <div className="d-flex flex-column" style={{width: '100%'}}>
                        <StaticName
                            title="IMAGE UPLOAD"
                        />
                        <Dropzone
                            onDrop={handleUpload}
                            onRemove={removeFile}
                            uploadedFiles={form.files}
                            additionalText="Files can't be edited once uploaded."
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex" style={{display:'flex', flexDirection:"column", flex: 1 }}>

                <div className="d-flex flex-row flex-fill">
                    <div className="d-flex flex-column" style={{flex:0.5, marginRight: 30}}>
                            <div className="d-flex flex-column">
                                <StaticName
                                    title="YOUR NEW IMAGES"
                                />

                                {form.imagesString.length > 0 && 
                                    <BlobImage
                                        imageSource={form.imagesString}
                                        url={false}
                                    />
                                }
                            </div>
                    </div>

                    <div className="d-flex flex-row" style={{display:'flex', flex:0.5,  flexDirection:"row"}}>
                        <div style={{width: '100%'}}>
                            <Dropzone
                                onDrop={handleNewImagesUpload}
                                uploadedFiles={[]}
                                additionalText="Files can't be edited once uploaded."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Button
                    _Function={_Add}
                    product={''}
                    files={''}
                    title={'ADD'}
                />
            </div>

        </div>
    );
    
};

Index.propTypes = {
    _AddVariantValues: PropTypes.func,
    _Add: PropTypes.func
};

export default Index 