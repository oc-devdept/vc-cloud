import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import FormInput from "Components/Form/FormInput";
import Dropzone from "Components/Dropzone";

const initState = {
  name: "",
  person: 0,
  luggage: 0,
  doors: 0,
  transmission: "",
  price: 0,
  cdwPrice: 0,
  rentalCategoryId: ""
};

function RentalCarForm(props) {
  const { show, handleHide, action, categories, edit } = props;
  const [formState, setFormState] = React.useState(initState);
  const [fileState, setFileState] = React.useState([]);

  React.useEffect(() => {
    edit && setFormState({ ...edit });
  }, []);

  const handleChange = (field, value) => {
    setFormState(state => ({ ...state, [field]: value }));
  };
  const handleSave = () => {
    var data = new FormData();
    fileState.map(file => data.append(`upload`, file));
    const keys = Object.keys(formState);
    keys.forEach(key => {
      data.append(key, formState[key]);
    });
    action(data);
    handleHide();
  };

  function removeFile(file) {
    setFileState(state => {
      const index = state.indexOf(file);
      const imageToUpload = state.slice(0);
      imageToUpload.splice(index, 1);
      return imageToUpload;
    });
  }
  const handleUpload = file => {
    setFileState(file);
  };

  return (
    <DialogRoot
      show={show}
      handleHide={handleHide}
      title="Rental Car Form"
      size="md"
      dialogAction={handleSave}
      dialogActionLabel="Save"
    >
      <h4>Main Details</h4>
      <div className="row">
        <div className="col-md-4">
          <FormInput
            label="Name"
            value={formState.name}
            target="name"
            handleChange={handleChange}
            required={!formState.name}
          />
        </div>
        <div className="col-md-4">
          <FormInput
            label="Categories"
            value={formState.rentalCategoryId}
            required={!formState.rentalCategoryId}
            selectValues={categories}
            selectValueKey="id"
            target="rentalCategoryId"
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <FormInput
            label="Price"
            value={formState.price}
            target="price"
            type="number"
            handleChange={handleChange}
            required={!formState.price}
          />
        </div>
      </div>
      <hr />
      <h5>Details</h5>
      <div className="row">
        <div className="col-md-3">
          <FormInput
            label="Number of People"
            value={formState.person}
            type="number"
            target="person"
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <FormInput
            label="Luggage Space"
            value={formState.luggage}
            type="number"
            target="luggage"
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <FormInput
            label="Doors"
            value={formState.doors}
            type="number"
            target="doors"
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <FormInput
            label="Transmission"
            value={formState.transmission}
            target="transmission"
            selectValues={[{ name: "Auto" }, { name: "Manual" }]}
            selectValueKey="name"
            handleChange={handleChange}
          />
        </div>
      </div>
      <hr />
      <h5>Image Upload</h5>
      <div className="row">
        <div className="col-md-12">
          <Dropzone
            acceptFileTypes="image/jpeg,image/png"
            onDrop={handleUpload}
            onRemove={removeFile}
            uploadedFiles={fileState}
          />
          {edit && (
            <p className="text-muted">
              * Uploading another image will override the current one.
            </p>
          )}
        </div>
      </div>
    </DialogRoot>
  );
}

export default connectModal({ name: "rental_car_form" })(RentalCarForm);
