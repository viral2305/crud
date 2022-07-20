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
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CareProgramStepAction } from '../../../../../core/store/actions/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleChangeEvent } from '../../../../common/dynamicForms/dynamicHandler';
import { RenderPasswordIndicator } from '../../../../common/passwordIndicator';
import { HandleCutCopyPasteRule } from '../../../../../core/common/validate';
import { FormControlLabel,Checkbox } from '@material-ui/core';
import {ValidationMessage} from '../../../../../core/common/common'
import { RenderUsernameIndicator } from '../../../../common/usernameIndicator';
import {GetMultilingual, GetMultilingualTitle} from "../../../../../core/common/multilingual";

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


class StepTwo extends React.Component {
  state = {
    ConfirmPassword: '',
    password: '',
    SecurityQuestion1: '',
    SecurityQuestion2: '',
    ShowPasswordIndicator: false,
    ShowUsernameIndicator : false
  };

  handleChange = event => {
    handleChangeEvent(event, this.props)
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
  handleChangeNew = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  SetShowPasswordIndicator = (value) => {
    this.setState({
      ShowPasswordIndicator: value,
    });
  }
  SetShowUsernameIndicator = (value) => {
    this.setState({
      ShowUsernameIndicator: value,
    });
  }
  handleChangeNEW = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
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
        <Grid component="div" className={"stepthree"}>
          <Grid component="div" className={"accountarea"}>
            <Grid component="div" className={"grouppay"}>
              <div id="careProgram-step2">

                {
                  this.props.CareProgramPayload.isAccountRegistered.trim() !== "" ?
                    <Typography component="em" color="primary">{GetMultilingual("CareProgram.UnAuth.AlreadyRegSsa","You have already registered in SSA")}</Typography>
                    :
                    <React.Fragment>
                      <Typography component="em" color="primary">{GetMultilingual("CareProgram.UnAuth.CreateAccount","Create your MyAccount to manage your account online")}</Typography>
                      <form className={classes.root} autoComplete="off">
                      <FormControl className={'TextFieldWrapper'}>
                        <TextField id="outlined-name" label={GetMultilingual("CareProgram.UnAuth.Username","Username")} className={'TextFieldWrapper'} name="username"
                          value={this.props.CareProgramPayload.username} onChange={this.handleChange} margin="normal" variant="filled"
                          onFocus={() => this.SetShowUsernameIndicator(true)}
                          onBlur={() => this.SetShowUsernameIndicator(false)}
                          inputProps={{
                            "invaliderrormessage": ValidationMessage("CP014","Please enter a valid username:<br/>Minimum 6 characters <br/>No Space is allowed"),
                            "validatemessage": ValidationMessage("CP014","Please enter a valid username:<br/>Minimum 6 characters<br/> No Space is allowed"),
                            "maxlength": "80",
                            "minlength": "6",
                            "mandatory": "1",
                            "inputType": "UserID",
                            "validationtype": "3",
                            'aria-label': GetMultilingualTitle("CareProgram.UnAuth.Username", "Enter Username"),
                          }} />
                          <RenderUsernameIndicator ShowPasswordIndicator={this.state.ShowUsernameIndicator} />
                          </FormControl>
                        <FormControl className={'TextFieldWrapper'}>
                          <TextField id="password" className={'TextFieldWrapper'}
                            variant="filled" type={this.state.showPassword ? 'text' : 'password'}
                            label={GetMultilingual("CareProgram.UnAuth.Password","Password")} name="password" value={this.props.CareProgramPayload.password}
                            onChange={this.handleChange}
                            onFocus={() => this.SetShowPasswordIndicator(true)} onBlur={() => this.SetShowPasswordIndicator(false)}
                            inputProps={{
                              "invaliderrormessage": ValidationMessage("CP015","Please enter a valid password."),
                              "validatemessage": ValidationMessage("CP016","Please enter Password."),
                              "maxlength": "32",
                              "minlength": "8",
                              "mandatory": "1",
                              "inputType": "Password",
                              'aria-label': GetMultilingualTitle("CareProgram.UnAuth.Password", "Enter Password"),
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword} >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }} />
                          <RenderPasswordIndicator ShowPasswordIndicator={this.state.ShowPasswordIndicator} />
                        </FormControl>
                        <TextField id="confirm-password" className={'TextFieldWrapper'} variant="filled" type={this.state.showConfirmPassword ? 'text' : 'password'}
                          label={GetMultilingual("CareProgram.UnAuth.ConfirmPassword","Confirm Password")} name="confirmPassword" value={this.props.CareProgramPayload.confirmPassword} onChange={this.handleChange}
                          onCopy={HandleCutCopyPasteRule}
                          onCut={HandleCutCopyPasteRule}
                          onPaste={HandleCutCopyPasteRule}
                          onContextMenu={HandleCutCopyPasteRule}
                          inputProps={{
                            "invaliderrormessage": ValidationMessage("CP017","Passwords do not match, please enter the same password."),
                            "validatemessage": ValidationMessage("CP018","Please confirm your password."),
                            "maxlength": "32",
                            "minlength": "8",
                            "mandatory": "1",
                            "inputType": "ConfirmPassword",
                            "confirmWithPasswordID": 'password',
                            'aria-label': GetMultilingualTitle("CareProgram.UnAuth.ConfirmPassword", "Enter Confirm Password"),
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowConfirmPassword} >
                                  {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }} />
                        <div className="formSection" style={{ display: "block", width: "100%" }}>
                          <h3 className="mt-3 mb-0 dob-title register-enroll">
                            {GetMultilingual("CareProgram.UnAuth.EnrollPaperless","Make life easier by enrolling in paperless billing today")}</h3>
                        </div>
                        <div className='disclaimer-control'>
                          <FormControlLabel
                            control={<Checkbox color="secondary" checked={this.props.CareProgramPayload.isPaperLessEnroll} name="isPaperLessEnroll"
                              onChange={e => this.handleChange(e)} />}
                            label={GetMultilingual("CareProgram.UnAuth.GoPaperless","Yes, I want to enroll in paperless billing")}
                              aria-label={GetMultilingualTitle("CareProgram.UnAuth.GoPaperless", "Check for Paperless")}
                          />
                        </div>
                        {/*<div className='paperLessSection mt-2'>*/}
                        {/*  <h3> {GetMultilingual("CareProgram.UnAuth.ReduceClutter","Reduce clutter, simplify your life and help the environment.")}</h3><p>{GetMultilingual("CareProgram.UnAuth.EmailNotification","You'll receive an email notification each month to let you know when your bill is ready, and you can login to MyAccount to view and pay your bill.")}</p>*/}
                        {/*</div>*/}
                      </form>
                    </React.Fragment>
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    );
  }

}

StepTwo.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepTwo)));
