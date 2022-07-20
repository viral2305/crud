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
import {Checkbox, FormControlLabel} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { CareProgramAssistanceProgramEligibility, CareProgramIncomeSource  } from "../../../../../core/common/enums"


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


class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      householdIncome: '',
      accountNumber: '',
      familyMember: '',
      primaryEmail: '',
      primaryPhone: '8888888888',
      serviceAddress: '',
      primaryIncomeSource:[],
      secondaryIncomeSource : [],
      isAgree: false,
      isPublicAssistanceProgram: false
    };
  }
  componentDidMount() {
    const filteredData = [];
    if(this.props.CareProgramPayload.isPublicAssistanceProgram){
      this.props.CareProgramPayload.incomeSources.forEach( item =>{
        filteredData.push(CareProgramIncomeSource.filter(i => i.value === item)[0].label)
      })
    } else {
      this.props.CareProgramPayload.publicAssistanceProgram.forEach( item =>{
        filteredData.push(CareProgramAssistanceProgramEligibility.filter(i => i.value === item)[0].label)
      })
    }
    this.setState({
      householdIncome: this.props.CareProgramPayload.householdIncome,
      accountNumber : this.props.CareProgramPayload.accountNumber,
      serviceAddress :this.props.CareProgramPayload.serviceAddress,
      familyMember : parseInt(this.props.CareProgramPayload.adultNumber) + (this.props.CareProgramPayload.childNumber === "" ? 0 : parseInt(this.props.CareProgramPayload.childNumber)),
      primaryEmail : this.props.CareProgramPayload.email,
      primaryPhone : this.props.CareProgramPayload.mobile,
      primaryIncomeSource:filteredData,
      secondaryIncomeSource : filteredData,
      isPublicAssistanceProgram : this.props.CareProgramPayload.isPublicAssistanceProgram,
    });
    var payload = this.props.CareProgramPayload;
    payload.validateDivId = 'careProgram-step5';
    this.props.careProgramReducer(payload);
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onChange = (e) => {
    this.setState({
      isAgree: e.target.checked
    })
    var payload = this.props.CareProgramPayload;
    payload.isAgree = e.target.checked;
    this.props.careProgramReducer(payload);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid component="div" className={"rows"}>
        <Grid component="div" className={"steptwo"}>
          <Grid component="div" id="careProgram-step5" className={"accountarea accountareastep2"}>
            <Grid component="div" className={"grouppay"}>
              {this.state.isPublicAssistanceProgram ?
                <>
                  <Typography component="em" color="primary">{GetMultilingual("CareProgram.UnAuth.HouseNInc","Household & Income Information")}</Typography>
                  <Grid component="div" className={"PaymentSectionBP"}>
                    <Grid component="div" className={"IconSection"}>
                      <i aria-hidden="true" class="material-icons">attach_money</i>
                    </Grid>
                    <Typography className={classes.TypoBox}>
                      <Grid component="div" className={"ListAssign"}>
                        <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.HouseInc","Household Income")}</Typography>
                        <address className={classes.AddressLine}>{'$' + this.state.householdIncome}</address>
                      </Grid>
                    </Typography>
                  </Grid>
                  <Grid component="div" className={"PaymentSectionBP"}>
                    <Grid component="div" className={"IconSection"}>
                      <i aria-hidden="true" class="material-icons">groups</i>
                    </Grid>
                    <Typography className={classes.TypoBox}>
                      <Grid component="div" className={"ListAssign"}>
                        <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.FamilyMember","Family Members")}</Typography>
                        <address className={classes.AddressLine}>{this.state.familyMember}
                        </address>
                      </Grid>
                    </Typography>
                  </Grid>
                  <Grid component="div" className={"PaymentSectionBP"}>
                    <Grid component="div" className={"IconSection"}>
                      <i aria-hidden="true" class="material-icons">attach_money</i>
                    </Grid>
                    <Typography className={classes.TypoBox}>
                      <Grid component="div" className={"ListAssign"}>
                        <Typography component="h5" className={classes.headingfive}>{GetMultilingual("","Income Source(s)")}</Typography>
                        {this.state.primaryIncomeSource.length > 0 ?
                          this.state.primaryIncomeSource.map(item =>
                                <address className={classes.AddressLine}>{item}
                                </address>
                        ):<Typography className={classes.AddressLine}>No Income</Typography> }
                      </Grid>
                    </Typography>
                  </Grid>
                </> :
                  <>
                    <Typography component="em" color="primary">{GetMultilingual("CareProgram.UnAuth.HouseNInc","Public Assistance Program Eligibility")}</Typography>
                    <Grid component="div" className={"PaymentSectionBP"}>
                      <Grid component="div" className={"IconSection"}>
                        <i aria-hidden="true" class="material-icons">assignment_turned_in</i>
                      </Grid>
                      <Typography className={classes.TypoBox}>
                        <Grid component="div" className={"ListAssign"}>
                          <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.HouseInc","Programs Enrolled In")}</Typography>
                          {this.state.primaryIncomeSource.length > 0 &&
                          this.state.primaryIncomeSource.map(item =>
                              <address className={classes.AddressLine}>{item}
                              </address>
                          )}
                        </Grid>
                      </Typography>
                    </Grid>
                  </>
              }
              <Grid component="div" className={"PaymentSectionBP"}>
                <Grid component="div" className={"IconSection"}>
                  <i aria-hidden="true" class="material-icons">location_on</i>
                </Grid>
                <Typography className={classes.TypoBox}>
                  <Grid component="div" className={"ListAssign"}>
                    <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.ServiceAddress","Service Address")}</Typography>
                    <address className={classes.AddressLine}>{this.state.serviceAddress}
                    </address>
                  </Grid>
                </Typography>
              </Grid>
              <Grid className={classes.topspaceheading}>
                <Typography component="em" color="primary" >{GetMultilingual("CareProgram.UnAuth.AccHolInfo","Account Holder Information")}</Typography>
                <Grid component="div" className={"PaymentSectionBP"}>
                  <Grid component="div" className={"IconSection"}>
                    <i aria-hidden="true" class="material-icons">lock</i>
                  </Grid>
                  <Typography className={classes.TypoBox}>
                    <Grid component="div" className={"ListAssign"}>
                      <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.AccountNumber","Account Number")}</Typography>
                      <address className={classes.AddressLine}>{this.state.accountNumber}</address>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid component="div" className={"PaymentSectionBP"}>
                  <Grid component="div" className={"IconSection"}>
                    <i aria-hidden="true" class="material-icons">phone</i>
                  </Grid>
                  <Typography className={classes.TypoBox}>
                    <Grid component="div" className={"ListAssign"}>
                      <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.MobilePhone","Mobile Phone")}</Typography>
                      <address className={classes.AddressLine}>{MaskPhoneNumber(this.state.primaryPhone)}</address>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid component="div" className={"PaymentSectionBP"}>
                  <Grid component="div" className={"IconSection"}>
                    <i aria-hidden="true" class="material-icons">email</i>
                  </Grid>
                  <Typography className={classes.TypoBox}>
                    <Grid component="div" className={"ListAssign"}>
                      <Typography component="h5" className={classes.headingfive}>{GetMultilingual("CareProgram.UnAuth.PrimaryEmailAddress","Primary Email Address")} </Typography>
                      <address className={classes.AddressLine}>{this.state.primaryEmail}</address>
                    </Grid>
                  </Typography>
                  <Grid component="div" className={"PaymentSectionBP"}>
                    <div className="termsTransferPara">
                      <p>{GetMultilingual("", "I certify that the information I have provided in this application is true and correct. I understand that Southwest Gas reserves the right to verify my household eligibility and I agree to provide proof of eligibility, if asked. I agree to inform Southwest Gas within 30 days if I no longer qualify to receive the CARE discount. I understand that if I receive the CARE discount without meeting the qualifications I may be required to pay back the CARE discount I received. I understand that Southwest Gas can share my information with other utilities or their agents to enroll me in their assistance programs.")}</p>
                      <FormControlLabel
                          control={<Checkbox color="secondary" id="agreeTerm" checked={this.state.isAgree} inputProps={{
                            validatemessage: ValidationMessage("CP029","Please agree to the terms above to continue"),
                            invaliderrormessage: ValidationMessage("CP029","Please agree to the terms above to continue"),
                            mandatory: '1' ,
                            'aria-label': GetMultilingualTitle("Service.iagree", "Please confirm that you have read and agree to the terms.") || ""}}
                                             onChange={e => this.onChange(e)} />}
                          label={ReactHtmlParser(GetMultilingual("Service.iagree", "I have read and agree to the terms above."))}
                          aria-label={GetMultilingualTitle("Service.iagree", "Please confirm that you have read and agree to the terms.")}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepFive)));
