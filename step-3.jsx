'use strict'
import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { handleChangeEvent } from '../../../../common/dynamicForms/dynamicHandler';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CareProgramStepAction } from '../../../../../core/store/actions/actions';
import { InputAdornment } from '@material-ui/core';
import { NumericOnly } from '../../../../../core/common/validate';
import { MaskPhoneNumber, ValidationMessage } from '../../../../../core/common/common';
import {GetMultilingual, GetMultilingualTitle} from "../../../../../core/common/multilingual";
import {CareProgramAssistanceProgramEligibility} from "../../../../../core/common/enums";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SessionAccessor from "../../../../../core/common/sessionAccessor";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  formControlstate: {
    margin: '12px 3% 12px 0',
    width: '60%',
  },
  AccountSpanContainer: { display: 'flex' },
  AccountSpan: { flex: 1, alignSelf: 'center', },
  CustomBodyDialog: { padding: 0 },
  dialogPaper: {
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  }
});

class StepThree extends React.Component {
  state = {
    StateName: 'California',
    paymentdate: '',
    CreditCard: '',
    name: '',
    name1: '',
    labelWidth: 0,
    open: false,
    show: false,
  };

  handleChange = event => {
    if(event.target.type === "checkbox"){
      if(event.target.name === "none"){
        this.props.CareProgramPayload.isPublicAssistanceProgram = event.target.checked;
        // localStorage.setItem("IsIncome", event.target.checked);
        this.props.CareProgramPayload.publicAssistanceProgram = [];
        this.props.careProgramReducer(this.props.CareProgramPayload);
      } else {
        this.props.CareProgramPayload.isPublicAssistanceProgram = false;
        this.props.CareProgramPayload.incomeSources = [];
        if(this.props.CareProgramPayload.publicAssistanceProgram.includes(event.target.name)){
          this.props.CareProgramPayload.publicAssistanceProgram.splice(this.props.CareProgramPayload.publicAssistanceProgram.indexOf(event.target.name), 1);
          this.props.careProgramReducer(this.props.CareProgramPayload);
        } else {
          this.props.CareProgramPayload.publicAssistanceProgram.push(event.target.name);
          this.props.careProgramReducer(this.props.CareProgramPayload);
        }
      }
    } else if (event.target.name === "householdIncome" || event.target.name === "adultNumber" || event.target.name === "childNumber" || event.target.name == "sourceCode" ) {
      event.target.value = NumericOnly(event.target.value);
    }
    else if (event.target.name === "primaryIncomeSource") {
      this.props.CareProgramPayload.primaryIncomeSourceText = event.target.options[event.target.selectedIndex].text;
      this.props.careProgramReducer(this.props.CareProgramPayload);
    }
    else if (event.target.name === "secondaryIncomeSource") {
      this.props.CareProgramPayload.secondaryIncomeSourceText = event.target.options[event.target.selectedIndex].text;
      this.props.careProgramReducer(this.props.CareProgramPayload);
    }
    handleChangeEvent(event, this.props)
  };

  handleChangeselect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpen = () => {
    this.setState({
      show: true,
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ show: false });
  };
  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    return (
      <Grid component="div" className={"rows"}>
        <Grid component="div" className={"steptwo"}>
          <Grid component="div" className={"accountarea"}>
            <Grid component="div" className={"grouppay"}>
              <div id="careProgram-step3">
                  <Typography component="p" className="CareProgramTitle">
                      {GetMultilingual("", "Public Assistance Program Eligibility (Select all that apply)")}
                  </Typography>
                  <Typography component="p" className="CareProgramInfo">{GetMultilingual("", "If you or someone in your household participate(s) in any of the following programs, please select the program(s) below. Select at least 1 option or “None of the below” to proceed.")}</Typography>
                  <div className="care-checkbox-label">
                      <Typography component="div" className="mb-3">
                          <FormControlLabel
                              value="true"
                              control={<Checkbox
                                  inputProps={{
                                      InputType: "chk", name:"none", 'aria-label': GetMultilingualTitle("","None of the below (Proceeed with income Eligibility)")
                                  }}
                                  checked={this.props.CareProgramPayload.isPublicAssistanceProgram} color="secondary" onChange={this.handleChange} />}
                              label={GetMultilingual("", "None of the below (Proceed with income Eligibility)")}
                              color="secondary"
                              disabled={this.props.CareProgramPayload.publicAssistanceProgram.length > 0}
                          />
                      </Typography>
                      <div>
                          {CareProgramAssistanceProgramEligibility.map(item =>
                              <Typography component="div" >
                                  <FormControlLabel
                                      value="true"
                                      control={<Checkbox
                                          inputProps={{
                                              InputType: "chk", name: item.value, 'aria-label': GetMultilingualTitle("","None of the below (Proceeed with income Eligibility)")
                                          }}
                                          checked={this.props.CareProgramPayload.publicAssistanceProgram.includes(item.value)} color="secondary" onChange={this.handleChange} />}
                                      label={item.label}
                                      disabled={this.props.CareProgramPayload.isPublicAssistanceProgram}
                                      color="secondary"
                                  />
                              </Typography>
                          )}
                      </div>
                  </div>

                <Typography component="p" className="CareProgramTitle mt-4 mb-2">
                  {GetMultilingual("", "Service Address")}
                </Typography>
                <Typography component="p" className={'w-100 ft-size mb-4'}>
                  {this.props.CareProgramPayload.serviceAddress}
                </Typography>
                  <Typography component="h1" className={'dob-title dob-tbspace'}>{GetMultilingual("CareProgram.UnAuth.ALSourceCode","If you have been provided the source code, please enter")}</Typography>
                                <TextField id="outlined-sourceCode" label="Source Code" name="sourcecode" className={'TextFieldWrapper'} inputProps={{
                    validatemessage: ValidationMessage("CP006","Please enter a valid 3 digit Source Code."),
                    invaliderrormessage: ValidationMessage("CP006","Please enter a valid 3 digit Source Code."),
                    maxlength: "3",
                    minlength: "3",
                    inputtype: "SourceCode",
                    'aria-label': GetMultilingualTitle("CareProgram.UnAuth.ALSourceCode", "Enter 3 digit source code"),
                  }}
                    value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.sourceCode : ""} name="sourceCode" onChange={this.handleChange} defaultValue="888" margin="normal" variant="filled" />
              </div>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

    );
  }

}
StepThree.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    careProgramReducer: (step) => dispatch(CareProgramStepAction(step))
  }
}
function mapStateToProps(state) {
  return {
    CareProgramPayload: state.CareProgramPayload
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepThree)));

