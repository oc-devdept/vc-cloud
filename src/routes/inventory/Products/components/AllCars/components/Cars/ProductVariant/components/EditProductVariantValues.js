import React, {PureComponent, useState, useEffect} from "react";
import { PropTypes } from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from "Components/Dropzone";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'
import StaticName from 'Components/Inventory/StaticName'
import Image from 'Components/Image'
import BlobImage from 'Components/Inventory/BlobImage'


const Index = ({AddNewVariant, _EditVariantValues, ProductVariantValues, _DeleteSingleImage}) => {

    const [form, setState] = useState({
        name : ProductVariantValues.name,
        price: ProductVariantValues.price,
        isDefault: ProductVariantValues.isDefault,
        id: ProductVariantValues.id,
        productId: ProductVariantValues.productId,
        productVariantId: ProductVariantValues.productVariantId,

        // Display ThumbNail
        files: ProductVariantValues.files,
        newThumbNail: [],

        // Secondary Photos
        images: ProductVariantValues.images,
        newSecondaryPhotos :[],
        newSecondaryPhotosStrings :[],
    });

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setState(() => ({
            name : ProductVariantValues.name,
            price: ProductVariantValues.price,
            isDefault: ProductVariantValues.isDefault,
            id: ProductVariantValues.id,
            productId: ProductVariantValues.productId,
            productVariantId: ProductVariantValues.productVariantId,

            // Display ThumbNail
            files: ProductVariantValues.files,
            newThumbNail: [],

            // Secondary Photos
            images: ProductVariantValues.images,
            newSecondaryPhotos :[],
            newSecondaryPhotosStrings :[],
        }));
    }, [ProductVariantValues])
   


    const _HandleProductDetailValue = (e, element) => {
        setState(form => ({ ...form, [element]: e}));
    };

    const _HandleCheckBox = (e) => {
        setState(form => ({...form,[e.target.name]: !form[e.target.name]}));
    };

    const removeFile = (file) => {
        const CloneArray = Array.from(form.newThumbNail)
        const index = CloneArray.indexOf(file);
        const files = CloneArray.slice(0);
        files.splice(index, 1)
        setState(form => ({...form, newThumbNail: files}));
    }

    const handleUpload = file => {
        setState(form => ({...form, newThumbNail: file}));
    };

    const _Add = () => {
        _EditVariantValues(form)
    }


    const removeActualImages = async(index) => {
        const CloneArray = Array.from(form.images)
        _DeleteSingleImage(CloneArray[index])
    }

    const removeNewImages = async(index) => {
        // Needs to add to both arrays
        let CloneEditedImages = form.newSecondaryPhotos.slice(0)
        let CloneEditedImagesStrings = form.newSecondaryPhotosStrings.slice(0)
        
        CloneEditedImages = CloneEditedImages.filter((e, indexes) => indexes!=index)
        CloneEditedImagesStrings = CloneEditedImagesStrings.filter((e, indexes) => indexes!=index)

        setState(form => ({
            ...form, 
            newSecondaryPhotos: CloneEditedImages,
            newSecondaryPhotosStrings: CloneEditedImagesStrings
        }));
    }

    const handleNewImagesUpload = file => {
        // Needs to add to both arrays
        let CloneEditedImages = form.newSecondaryPhotos.slice(0)
        let CloneEditedImagesStrings = form.newSecondaryPhotosStrings.slice(0)
        
        const item = URL.createObjectURL(file[0])
        CloneEditedImages = CloneEditedImages.concat(file)
        CloneEditedImagesStrings = CloneEditedImagesStrings.concat(item)

        setState(form => ({
             ...form,
            newSecondaryPhotos: CloneEditedImages,
            newSecondaryPhotosStrings: CloneEditedImagesStrings
        }));
    };

    return (
        <div className="d-flex" style={{flex: 1, flexDirection:"column", padding :20}}>

            <div className="d-flex flex-row flex-fill" style={{paddingBottom: 20,}}>

                <div className="d-flex flex-column justify-content-between" style={{flex: 0.5, marginRight: 30}}>
                    
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
                        <div>
                            <Checkbox
                                edge="end"
                                onChange={_HandleCheckBox}
                                checked={form.isDefault}
                                name="isDefault"
                            /> 
                        </div>
                    </div>

                </div>

                <div className="d-flex flex-column" style={{width: '100%', flex: 0.5}}>
                    <div>
                        <StaticName
                            title="UPLOAD NEW THUMBNAIL"
                        />     

                        {/* {form.files.length > 0 && 
                            <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between", marginTop: 10}}>
                                <Image
                                    imageSource={form.files}
                                    single={true}
                                    thumbNail={true}
                                />
                                <Dropzone
                                    onDrop={handleUpload}
                                    onRemove={removeFile}
                                    uploadedFiles={form.newThumbNail}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>
                        }
                        {form.files.length == 0 && 
                            <Dropzone
                                onDrop={handleUpload}
                                onRemove={removeFile}
                                uploadedFiles={form.newThumbNail}
                                additionalText="Files can't be edited once uploaded."
                            />
                        } */}

                        <Dropzone
                            onDrop={handleUpload}
                            onRemove={removeFile}
                            uploadedFiles={form.newThumbNail}
                            additionalText="Files can't be edited once uploaded."
                        />

                    </div>
                </div>

            </div>
            

            <div className="d-flex" style={{display:'flex', flexDirection:"row", flex: 1 }}>

                <div style={{display:'flex', flex:0.5, flexDirection:"column", marginRight: 30}}>
                    
                    {form.images.length > 0 && 
                        <div className="d-flex flex-column">
                            <StaticName
                                title="CURRENT IMAGES"
                            />

                            <BlobImage
                                imageSource={form.images}
                                url={true}
                                remove={true}
                                removeNewImages={removeActualImages}
                            />
                            
                        </div>
                    }
                    
                    {form.newSecondaryPhotosStrings.length > 0 && 
                        <div className="d-flex flex-column">
                            <StaticName
                                title="YOUR NEW IMAGES"
                            />

                            <BlobImage
                                imageSource={form.newSecondaryPhotosStrings}
                                url={false}
                                remove={true}
                                removeNewImages={removeNewImages}
                            />
                        </div>
                    }
                </div>

                <div style={{display:'flex', flex:0.5,  flexDirection:"row"}}>
                    <div style={{width: '100%'}}>
                        <Dropzone
                            onDrop={handleNewImagesUpload}
                            uploadedFiles={[]}
                            additionalText="Files can't be edited once uploaded."
                        />
                    </div>
                </div>
            
            </div>


            <div style={{display:'flex', justifyContent:'flex-end', marginTop: 10}}>
                
                <div style={{marginRight: 10}}>
                    <Button
                        _Function={AddNewVariant}
                        product={''}
                        files={''}
                        title={'ADD NEW VARIANT'}
                    />
                </div>

                <Button
                    _Function={_Add}
                    product={''}
                    files={''}
                    title={'SAVE EDIT'}
                />
            </div>

        </div>
    );
    
};


Index.propTypes = {
    ProductVariantValues : PropTypes.object.isRequired
};
  

export default Index;
