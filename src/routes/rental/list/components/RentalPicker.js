import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DialogRoot from "Components/Dialog/DialogRoot";
import RentalPopupList from "./RentalPopuplist";
import { getRentalCar } from "Ducks/rental";


const useStyles  =makeStyles( theme => ({
    root: {
      marginBottom: theme.spacing(1),
      width: "100%"
    }
  }));

const CarPickerDialog = (props) => {
    return (
        <DialogRoot show={props.show} handleHide={props.handleHide} size="lg" close>
            <RentalPopupList 
                tableData={props.allCars}
                onSelect={props.onSelect}
                handleHide={props.handleHide}
                target={props.target}
            
            />
        </DialogRoot>
    )
}

const RentalPicker = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showPicker, setShowPicker] = useState(false);    
    const allCars = useSelector(state => state.rentalState.list);
    useEffect(()=> {
        dispatch(getRentalCar());
    }, [])

    const handleHide = () => {
        setShowPicker(false);
    }

    const renderName = (value, displayValue) => {
        let selected = Object.assign([], allCars).find(item => item.id == value);
        if(selected){
            return selected.name;

        }else if(displayValue){
            return displayValue;
        }
        else {
            return "";
        }
    }

    return (
    <React.Fragment>
        <FormControl className={classes.root}>
          <InputLabel className="fw-bold" shrink>
            Rental Car
          </InputLabel>
          <BaseInput
            value={renderName(props.value, props.displayValue)}
            readOnly
            //onFocus={() => setShowPicker(true)}
            onClick={() => setShowPicker(true)}
          />
          {props.required && <FormHelperText error>* Required Field</FormHelperText>}
          <CarPickerDialog
            allCars={allCars}
            onSelect={props.handleChange}
            selected={props.value}
            target={props.target}
            show={showPicker}
            handleHide={handleHide}
          />
        </FormControl>
        
    </React.Fragment>
    )
}

export default RentalPicker;