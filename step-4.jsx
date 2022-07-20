'use strict'
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CareProgramStepAction } from '../../../../../core/store/actions/actions';
import {MaskPhoneNumber, ValidationMessage} from '../../../../../core/common/common';
import {GetMultilingual, GetMultilingualTitle} from "../../../../../core/common/multilingual";
import {Checkbox, FormControlLabel, InputAdornment} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FilledInput from "@material-ui/core/FilledInput/FilledInput";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import {CareProgramIncomeSource} from "../../../../../core/common/enums";
import {NumericOnly} from "../../../../../core/common/validate";
import {handleChangeEvent} from "../../../../common/dynamicForms/dynamicHandler";


const styles = theme => ({
  TypoBox: {
    padding: '25px 0px 15px 0',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: '16px'
  },
  headingfive: {
    margin: '0 0 5px 0',
    fontSize: 15,
    color: '#333333',
    display: 'flex',
    width: '100%'
  },
  AddressBankLine: {
    fontSize: 16,
    paddingTop: 5,
    width: '100%',
    color: '#808080'
  },
  AddressLine: {
    fontSize: 13,
    paddingTop: 5,
    width: '100%',
    color: '#808080'
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  AccountSpanContainer: { display: 'flex' },
  AccountSpan: { flex: 1, alignSelf: 'center', },
  CustomBodyDialog: { padding: 0 },
  dialogPaper: {
    width: '100%',
  },
  EditLink: {
    display: 'flex',
    fontSize: 15,
    fontFamily: 'NewsGothicfamily-SemiBold',
    color: '#005854',
    textTransform: 'capitalize',
    alignSelf: 'center'
  },
  link: {
    color: '#0C75DF !important',
    fontSize: '16px',
    textDecoration: 'underline !important',
  },
  accepttxt: {
    color: '#666366',
    fontSize: '16px',
  },
  topspaceheading: {
    paddingTop: '25px',
    width: '100%',
  }
});


class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      householdIncome: '',
      accountNumber: '',
      familyMember: '',
      primaryEmail: '',
      primaryPhone: '8888888888',
      serviceAddress: '',
      primaryIncomeSource:'',
      secondaryIncomeSource : '',
      isAgree: false
    };
  }
  componentDidMount() {
    this.setState({
      householdIncome: this.props.CareProgramPayload.householdIncome,
      accountNumber : this.props.CareProgramPayload.accountNumber,
      serviceAddress :this.props.CareProgramPayload.serviceAddress,
      familyMember : parseInt(this.props.CareProgramPayload.adultNumber) + (this.props.CareProgramPayload.childNumber === "" ? 0 : parseInt(this.props.CareProgramPayload.childNumber)),
      primaryEmail : this.props.CareProgramPayload.email,
      primaryPhone : this.props.CareProgramPayload.mobile,
      primaryIncomeSource:this.props.CareProgramPayload.primaryIncomeSourceText,
      secondaryIncomeSource : this.props.CareProgramPayload.secondaryIncomeSourceText,
    });
    var payload = this.props.CareProgramPayload;
    payload.validateDivId = 'careProgram-step4';
    this.props.careProgramReducer(payload);
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChange = event => {
    if(event.target.type === "checkbox"){
      if(event.target.name === "none"){
        this.props.CareProgramPayload.isIncomeSourceProgram = event.target.checked;
        this.props.CareProgramPayload.incomeSources = [];
        this.props.careProgramReducer(this.props.CareProgramPayload);
      } else {
        if (this.props.CareProgramPayload.incomeSources.includes(event.target.name)) {
          this.props.CareProgramPayload.incomeSources.splice(this.props.CareProgramPayload.incomeSources.indexOf(event.target.name), 1);
          this.props.careProgramReducer(this.props.CareProgramPayload);
        } else {
          this.props.CareProgramPayload.incomeSources.push(event.target.name);
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

  render() {
    const { classes } = this.props;
    return (
      <Grid component="div" className={"rows"}>
        <Grid component="div" className={"steptwo"}>
          <Grid component="div" id="careProgram-step4" className={"accountarea accountareastep2"}>
            <Grid component="div" className={"grouppay"}>
              {this.props.CareProgramPayload.isPublicAssistanceProgram ?
                (<>
                  <Typography component="p"
                          className={'proxima-nova ft-size'}>{GetMultilingual("", "You can also qualify for CARE if you meet the income guideline qualifications based on your household income and household size.")}</Typography>
                    <TextField label={GetMultilingual("CareProgram.UnAuth.HouseInc","Total combined gross annual household income")} className={'TextFieldWrapper'}
                               id="outlined-householdIncome"
                               value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.householdIncome : ""}
                               onChange={this.handleChange}
                               name="householdIncome"
                               margin="normal"
                               variant="filled"
                               InputProps={{
                                 startAdornment:<InputAdornment position="start">$</InputAdornment>
                               }}
                               inputProps={{
                                 'aria-label': GetMultilingualTitle("CareProgram.UnAuth.HouseInc", "Enter Household Income"),
                                 invaliderrormessage: ValidationMessage("CP027","Please enter valid Household Income."),
                                 validatemessage: ValidationMessage("CP002","Please enter Household Income."),
                                 maxlength: 7, minlength: 1, mandatory: '1', InputType: "AccountNumber",inputMode: 'numeric', validationtype: '3'
                               }}
                    />
                  <Typography component="h4" className={'dob-title dob-tbspace'}>{GetMultilingual("CareProgram.UnAuth.NumPerInHouse","Number of persons living in my household")}</Typography>
                  <form className={classes.root} autoComplete="off">
                    <TextField id="outlined-adultNumber"
                               value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.adultNumber : ""}
                               onChange={this.handleChange}
                               name="adultNumber" label={GetMultilingual("CareProgram.UnAuth.NumAdults","Number of adults")} className={'TextFieldWrapper textflexhalfleft'}
                               defaultValue="2 " margin="normal" variant="filled" inputProps={{
                      invaliderrormessage: ValidationMessage("CP003","Please enter a valid Number of Adults."),
                      validatemessage: ValidationMessage("CP004","Please enter Number of Adults"),
                      InputType: "AdultNumber",
                      inputMode: 'numeric',
                      maxlength: 2, minlength: 1, mandatory: '1', validationtype: '3',
                      'aria-label': GetMultilingualTitle("CareProgram.UnAuth.NumAdults", "Enter Number of Adults"),
                    }} />
                    <TextField id="outlined-childNumber"
                               value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.childNumber : ""}
                               onChange={this.handleChange}
                               name="childNumber" label={GetMultilingual("CareProgram.UnAuth.NumChldOp","Number of children")} className={'TextFieldWrapper textflexhalfright'}
                               defaultValue="2 " margin="normal" variant="filled" inputProps={{
                      validatemessage: ValidationMessage("CP028","Please enter Number of Children."),
                      inputMode: "numeric",
                      maxlength: 2, minlength: 1, mandatory: '1', 'aria-label': GetMultilingualTitle("CareProgram.UnAuth.NumChldOp", "Enter Number of Children"),
                    }} />

                    <Typography component="p" className="CareProgramTitle pt-3 mb-2">
                      {GetMultilingual("", "Income Source(s) (Please select all that apply)")}
                    </Typography>
                    <Typography component="p"
                                className="mb-3 w-100">{GetMultilingual("", "Must select at least 1 option.")}</Typography>
                    <Typography component="div" className="mb-1">
                      <FormControlLabel
                          value="true"
                          control={<Checkbox
                              inputProps={{
                                InputType: "chk", name:"none", 'aria-label': GetMultilingualTitle("","None of the below")
                              }}
                              checked={this.props.CareProgramPayload.isIncomeSourceProgram} color="secondary" onChange={this.handleChange} />}
                          label={GetMultilingual("", "No Income")}
                          color="secondary"
                          disabled={this.props.CareProgramPayload.incomeSources.length > 0}
                      />
                    </Typography>
                    {CareProgramIncomeSource &&
                    CareProgramIncomeSource.map(item =>
                        <Typography component="div">
                          <FormControlLabel
                              value="true"
                              control={<Checkbox
                                  inputProps={{
                                    InputType: "chk",
                                    name: item.value,
                                    'aria-label': GetMultilingualTitle("", "None of the below (Proceeed with income Eligibility)")
                                  }}
                                  checked={this.props.CareProgramPayload.incomeSources.includes(item.value)} color="secondary"
                                  onChange={this.handleChange}/>}
                              label={item.label}
                              disabled={this.props.CareProgramPayload.isIncomeSourceProgram}
                              color="secondary"
                          />
                        </Typography>
                    )}
                    <TextField id="outlined-mobile" label={GetMultilingual("CareProgram.UnAuth.MobilePhone","Mobile Phone")} className={'TextFieldWrapper'}
                               value={this.props.CareProgramPayload != undefined ? MaskPhoneNumber(this.props.CareProgramPayload.mobile) : ""}
                               name="mobile" onChange={this.handleChange}
                               onPaste={e => {
                                 let mNumber = (e.clipboardData || window.clipboardData).getData('text/plain');
                                 if(mNumber?.trim()?.length <= 10){
                                   e.target.value = MaskPhoneNumber(mNumber)
                                 } else {
                                   e.preventDefault()
                                 }
                               }}
                               defaultValue="(888)888-8888"
                               margin="normal"
                               variant="filled"
                               inputProps={{
                                 "invaliderrormessage": ValidationMessage("CP013","Please enter a valid 10 digit Mobile Phone Number."),
                                 "validatemessage": ValidationMessage("CP013","Please enter a valid 10 digit Mobile Phone Number."),
                                 "maxlength": "12",
                                 "minlength": "12",
                                 "mandatory": "1",
                                 "inputType": "Phone",
                                 "inputMode": 'numeric',
                                 'aria-label': GetMultilingualTitle("CareProgram.UnAuth.MobilePhone", "Enter Mobile Phone"),
                               }}
                    />
                    <TextField id="outlined-email" label={GetMultilingual("CareProgram.UnAuth.PrimaryEmailAddress","Primary Email Address")} className={'TextFieldWrapper'}
                               value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.email : ""}
                               disabled={this.props.CareProgramPayload.isEmail}
                               inputProps={{
                                 inputtype: "Email",
                                 invaliderrormessage: ValidationMessage("CP006","Please enter a valid Primary Email Address."),
                                 validatemessage: ValidationMessage("CP006","Please enter a valid Primary Email Address."),
                                 mandatory: "1",
                                 'aria-label': GetMultilingualTitle("CareProgram.UnAuth.PrimaryEmailAddress", "Enter primary email address"),
                                 autocomplete: "off",
                                 validationtype: "3"
                               }}
                               name="email" onChange={this.handleChange} margin="normal" variant="filled" />
                  </form>
                </>
                )
               :(
               <>
                  <TextField id="outlined-mobile" label={GetMultilingual("CareProgram.UnAuth.MobilePhone","Mobile Phone")} className={'TextFieldWrapper'}
                             value={this.props.CareProgramPayload != undefined ? MaskPhoneNumber(this.props.CareProgramPayload.mobile) : ""}
                             name="mobile" onChange={this.handleChange}
                             onPaste={e => {
                               let mNumber = (e.clipboardData || window.clipboardData).getData('text/plain');
                               if(mNumber?.trim()?.length <= 10){
                                 e.target.value = MaskPhoneNumber(mNumber)
                               } else {
                                 e.preventDefault()
                               }
                             }}
                             defaultValue="(888)888-8888"
                             margin="normal"
                             variant="filled"
                             inputProps={{
                               "invaliderrormessage": ValidationMessage("CP013","Please enter a valid 10 digit Mobile Phone Number."),
                               "validatemessage": ValidationMessage("CP013","Please enter a valid 10 digit Mobile Phone Number."),
                               "maxlength": "12",
                               "minlength": "12",
                               "mandatory": "1",
                               "inputType": "Phone",
                               "inputMode": 'numeric',
                               'aria-label': GetMultilingualTitle("CareProgram.UnAuth.MobilePhone", "Enter Mobile Phone"),
                             }}
                  />
                  <TextField id="outlined-email" label={GetMultilingual("CareProgram.UnAuth.PrimaryEmailAddress","Primary Email Address")} className={'TextFieldWrapper'}
                             value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.email : ""}
                             inputProps={{
                               inputtype: "Email",
                               invaliderrormessage: ValidationMessage("CP006","Please enter a valid Primary Email Address."),
                               validatemessage: ValidationMessage("CP006","Please enter a valid Primary Email Address."),
                               mandatory: "1",
                               'aria-label': GetMultilingualTitle("CareProgram.UnAuth.PrimaryEmailAddress", "Enter primary email address"),
                               autocomplete: "off"
                             }}
                             disabled={this.props.CareProgramPayload.isEmail}
                             name="email" onChange={this.handleChange} margin="normal" variant="filled" />
                </>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepFour)));
