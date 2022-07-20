'use strict'
import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import AccountNumber from '../../../../../assets/images/account-tooltip-icons.jpg';
import DateOfBirth from '../../DateOfBirth';
import { CareProgramStepAction } from '../../../../../core/store/actions/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleChangeEvent } from '../../../../common/dynamicForms/dynamicHandler';
import { NumericOnly } from '../../../../../core/common/validate';
import { ValidationMessage } from '../../../../../core/common/common'
import { GetMultilingual, GetMultilingualTitle } from "../../../../../core/common/multilingual";

const styles = theme => ({
  tooltipClass: {
    backgroundColor: "transparent",
    color: '#666',
    padding: 0,

  },
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
class StepOne extends React.Component {
  state = {
    Month: '',
    Day: '',
    Year: '',
    paymentdate: '',
    CreditCard: '',
    name: '',
    name1: '',
    labelWidth: 0,
    open: false,
    show: false,
  };

  handleChange = event => {
    let isCaps = false;
    if (event.target.name === "accountNumber") {
      event.target.value = NumericOnly(event.target.value);
    }
    if (event.target.name === "firstName" || event.target.name === "middleName" || event.target.name === "lastName")
      isCaps = true;
    handleChangeEvent(event, this.props, '', isCaps)
  };
  handleChangeselect = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
    return (
      <Grid component="div" className={"rows"}>
        <Grid component="div" className={"stepone"}>
          <Grid component="div" className={"accountarea"}>
            <Grid component="div" className={"grouppay"}>
              <div id="careProgram-step1">
                <FormControl variant="filled" className="TextFieldfmctr">
                  <InputLabel htmlFor="filled-adornment-password">{GetMultilingual("CareProgram.UnAuth.AccountNumber", "Account Number")}</InputLabel>
                  <FilledInput
                    id="accountnumber"
                    className="TextFieldWrapper"
                    label={GetMultilingual("CareProgram.UnAuth.AccountNumber", "Account Number")}
                    name="accountNumber"
                    value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.accountNumber : ""}
                    onChange={this.handleChange}
                    inputProps={
                      {
                        invaliderrormessage: ValidationMessage("CP008", "Please enter a valid 12-13 digit Account Number."),
                        validatemessage: ValidationMessage("CP009", "Please enter Account Number."),
                        mandatory: "1",
                        maxlength: "13",
                        minlength: "12",
                        inputType: "AccountNumber",
                        inputMode: 'numeric',
                        'aria-label': GetMultilingualTitle("CareProgram.UnAuth.AccountNumber", "Enter Account Number")
                      }
                    }
                  />
                  <Tooltip className={classes.tooltipClass} title={<div className="text-center"><h3 className="register-tooltip-heading">Where is my account number?</h3><img alt="arrow" src={AccountNumber} className={'img_accountno'} arrow />  </div>}>
                    <IconButton className="custom-tooltip-button" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </FormControl>

                <Typography component="h4" className={'dob-title dob-tbspace'}>{GetMultilingual("CareProgram.UnAuth.NameAsBill", "Name (as it appears on your bill)")}</Typography>
                <form className={classes.root} autoComplete="off">
                  <TextField id="outlined-name" label={GetMultilingual("CareProgram.UnAuth.FirstName", "First Name")} name="firstName" className={'TextFieldWrapper textflexhalfleft'}
                    value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.firstName : ""} onChange={this.handleChange} margin="normal" variant="filled"
                    inputProps={{
                      "invaliderrormessage": ValidationMessage("CP010", "Please enter First Name."),
                      "validatemessage": ValidationMessage("CP010", "Please enter First Name."),
                      "mandatory": "1",
                      "maxlength": "40",
                      "minlength": "1",
                      "inputType": "Name",
                      'aria-label': GetMultilingualTitle("CareProgram.UnAuth.FirstName", "Enter First Name")
                    }} />
                  <TextField id="outlined-middle" label={GetMultilingual("CareProgram.UnAuth.MiddleName", "Middle Initial (optional)")} name="middleName" className={'TextFieldWrapper textflexhalfright'}
                             value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.middleName : ""} onChange={this.handleChange} margin="normal" variant="filled"
                    inputProps={{
                      "invaliderrormessage": ValidationMessage("CP011", "Please enter Middle Name."),
                      "validatemessage": ValidationMessage("CP011", "Please enter Middle Name."),
                      "maxlength": "1",
                      "minlength": "1",
                      "inputType": "Name",
                      'aria-label': GetMultilingualTitle("CareProgram.UnAuth.MiddleName", "Enter Middle Name")
                    }} />

                  <TextField id="outlined-last" label={GetMultilingual("CareProgram.UnAuth.LastName", "Last Name")} name="lastName" className={'TextFieldWrapper'}
                    value={this.props.CareProgramPayload != undefined ? this.props.CareProgramPayload.lastName : ""} onChange={this.handleChange} margin="normal" variant="filled"
                    inputProps={{
                      "invaliderrormessage": ValidationMessage("CP011", "Please enter Last Name."),
                      "validatemessage": ValidationMessage("CP011", "Please enter Last Name."),
                      "maxlength": "40",
                      "minlength": "1",
                      "inputType": "Name",
                      'aria-label': GetMultilingualTitle("CareProgram.UnAuth.LastName", "Enter Last Name"),
                      "mandatory": "1",
                    }} />

                  <Grid className={'datebrthsec'}>
                    <DateOfBirth CareProgramPayload={this.props} />
                  </Grid>
                </form>

              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    );
  }

}

StepOne.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepOne)));
