import { toast } from 'react-toastify';
import { Toaster, UnMaskPhoneNumber, ValidationMessage } from './../common/common';


export function ValidateSinglePage(tblids, dynamicMessage) {
    toast.dismiss();
    var IsRegistration = false;
    var RegxEmailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var maxlength = 5, strongRegex = /^[A-Za-z0-9@$!%*#?&~^()=<>,;:'\"[\]{}|\+-_.]{8,30}/, Timeregexp = /^([0-9]|([1][0-2])):[0-5][0-9]?([AP][M]?)/;
    var userNameRegex = /^(?=.*[A-Za-z])[\w~@#$%^_&*+=`{|}!.?\/-]{6,80}$/;

    var passwordRegex = /^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#?\$%~()|{}\^&\*\[\]"\';:_\-<>\.,=\+\/\\]).*$/;
    //document.getElementById('errorMsg').remove();
    //To Validate Multiple Div Send values in comma seperated
    var tblid = [];
    var ctrlObj = [];

    if (tblids.indexOf(',') > 0) {
        tblid = tblids.split(',');
    }
    else {
        tblid.push(tblids);
    }
    for (var i = 0; i < tblid.length; i++) {
        var contL = document.querySelectorAll('#' + tblid[i] + ' input[type=text],input[type=password],textarea');
        contL.forEach(function (value, i) {
            if (value.value.trim().length == 0)
                value.value = ''
        });
        var cntrl = document.querySelector('#' + tblid[i])
        if (cntrl == null)
            return true;
        var ctrls = [];
        //this code for landlord agreement step 3
        //If manager name and phone number is filled then manager tin should also be mandatory
        if (tblid[i] === 'landlordAggrementStep-3') {
            let managerName = '', managerPhone = '', managerTin = '';
            contL.forEach(function (value, i) {
                if (value.name === 'ManagerName')
                    managerName = value.value;
                else if (value.name === 'ManagerPhoneNumer')
                    managerPhone = value.value;
                else if (value.name === 'ManagerTin')
                    managerTin = value.value;
            });
            if (!CheckIfNullOrEmpty(managerName) || !CheckIfNullOrEmpty(managerPhone))
                ctrls = cntrl.querySelectorAll('input[name="ManagerTin"]');
            else if (!CheckIfNullOrEmpty(managerTin))
                ctrls = cntrl.querySelectorAll('input[name="ManagerTin"]');
            else if (!CheckIfNullOrEmpty(managerPhone))
                ctrls.push(cntrl.querySelectorAll('input[name="ManagerPhoneNumer"]'));
        }
        else
            ctrls = cntrl.querySelectorAll('input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"],canvas[mandatory="1"],md-select[mandatory="1"]');
        //var ctrls = document.querySelectorAll('#' + tblid[i] + ' input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"],canvas[mandatory="1"],md-select[mandatory="1"]');
        for (var j = 0; j < ctrls.length; j++) {
            if (ctrls[j].visible() == true) {
                if (ctrls[j].classList.contains("myCanvasTemp")) {
                    if (ctrls[j].attributes['lastx'] == undefined && ctrls[j].attributes['lasty'] == undefined) {
                        ctrlObj.push(ctrls[j]);
                    }
                }
                else if (ctrls[j].type == "file" && ctrls[j].attributes['tcollectionid'] != undefined) {
                    if (ctrls[j].parentElement.nextSibling.innerHTML == "")
                        ctrlObj.push(ctrls[j]);
                }
                else if ((ctrls[j].value == "//" || ctrls[j].value == "" || ctrls[j].value == null || ctrls[j].value == "[object Object]") && ctrls[j].type != "checkbox") {
                    ctrlObj.push(ctrls[j]);
                }
                else if (ctrls[j].type == "email" && (ctrls[j].value == "" || ctrls[j].value == null)) {
                    ctrlObj.push(ctrls[j]);
                }
                else if (ctrls[j].type == "checkbox") {
                    if (ctrls[j].checked == false)
                        ctrlObj.push(ctrls[j]);
                }
            }
        }
    }
    if (ctrlObj.length > 1) {
        ctrlObj[0].dispatchEvent(new Event("focus"))
        //Check if all mandatory fields are of DOB - If Yes display different toaster error else proceed as it is
        if (CheckIfInputSelectandErrorIdDOB(ctrlObj)) {
            document.getElementById(ctrlObj.length > 0 ? ctrlObj[0].attributes['errorSpanId'].value : "DOBSPAN").show()
        }
        else if (document.getElementById("AllErrMsg") != undefined && document.getElementById("AllErrMsg").innerText == '') {
            try {
                if (typeof dynamicMessage === "undefined") {
                    Toaster.error(ValidationMessage('VLD001', 'Please enter all the mandatory information.'));
                }
                else {
                    Toaster.error(dynamicMessage);
                }
            } catch (e) {
                Toaster.error(ValidationMessage('VLD001', 'Please enter all the mandatory information.'));
            }
            if (document.getElementById("DOBSPAN") != null && document.getElementById("DOBSPAN") != undefined)
                document.getElementById("DOBSPAN").hide()
        }
        else {
            try {
                if (typeof dynamicMessage === "undefined") {
                    Toaster.error(document.getElementById("AllErrMsg").innerText);
                }
                else {
                    Toaster.error(dynamicMessage);
                }
            } catch (e) {
                Toaster.error(document.getElementById("AllErrMsg").innerText);
            }
            if (document.getElementById("DOBSPAN") != null && document.getElementById("DOBSPAN") != undefined)
                document.getElementById("DOBSPAN").hide()
        }
        for (var i = 0; i < ctrlObj.length; i++) {

            if (ctrlObj[i].className.indexOf('error-invalid') == -1) {
                ctrlObj[i].classList.add('error-invalid');
                if (ctrlObj[i].tagName == "SELECT")
                    ctrlObj[i].parentElement.parentElement.parentElement.classList.add('error-invalid-p');
                else
                    ctrlObj[i].parentElement.parentElement.classList.add('error-invalid-p');
            }
            if (ctrlObj[i].id == "signval") {
                if (document.getElementById('signval').value == "") {
                    ctrlObj[i].classList.add('output');

                    ctrlObj[i].previousElementSibling.classList.add('error-invalid');
                }
                else {
                    ctrlObj[0].classList.remove('error-invalid');
                    ctrlObj[0].previousElementSibling.classList.remove('error-invalid');
                }
            }
        }
        return false;
    }
    else if (ctrlObj.length == 1) {
        if (ctrlObj[0].type == 'file') {//File type serately handled as showing w2tag was not showing proper
            Toaster.error(getmessage(ctrlObj[0], 'ValidateMessage'));
        }
        else if (CheckIfInputSelectandErrorIdDOB(ctrlObj)) {
            document.getElementById(ctrlObj.length > 0 ? ctrlObj[0].attributes['errorSpanId'].value : "DOBSPAN").show()
        }
        else {
            var element = document.getElementById('signval') == null ? '' : document.getElementById('signval');
            if (element.value != "" && element != "") {
                document.getElementById('signval').classList.remove('error-invalid');
                document.getElementById('signval').previousElementSibling.classList.remove('error-invalid');
            }
            error.showerror(ctrlObj[0], getmessage(ctrlObj[0], 'ValidateMessage'));
            ctrlObj[0].dispatchEvent(GetEvent("focus"));
            if (document.getElementById("DOBSPAN") != null && document.getElementById("DOBSPAN") != undefined)
                document.getElementById("DOBSPAN").hide()
        }
        return false;
    }

    else if (ctrlObj.length == 0) {
        for (var m = 0; m < tblid.length; m++) {
            var allCtrlObj = document.querySelectorAll('#' + tblid[m] + ' input[type="text"], input[type="password"], select, textarea');

            for (var i = 0; i < allCtrlObj.length; i++) {
                var ctrlName = allCtrlObj[i].id;
                if (ctrlName != "") {
                    var inputtype = allCtrlObj[i].attributes['InputType'] != undefined ? allCtrlObj[i].attributes['InputType'].value : "";
                    if (allCtrlObj[i].value != null) {


                        if (allCtrlObj[i].value.length > 0) {
                            switch (inputtype) {
                                case "AccountNumber":
                                    // check if value contains only zero in its field value
                                    var acc = parseInt(allCtrlObj[i].value, 10) != 0
                                    if (!acc) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i])
                                        return false;
                                    }
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value) || allCtrlObj[i].value.length > parseInt(allCtrlObj[i].attributes["maxlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i])
                                        return false;
                                    }
                                    break;
                                case "Email":
                                    var email = allCtrlObj[i].value;
                                    if (allCtrlObj[i].value.length == "") {
                                        if (!IsRegistration) {
                                            error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        }
                                        else {
                                            error.showerror(allCtrlObj[i], allCtrlObj[i].attributes['InvalidErrorMessage'].value);
                                        }
                                        allCtrlObj[i].dispatchEvent(GetEvent("focus"));
                                        return false;
                                    }
                                    else {
                                        if (!RegxEmailFilter.test(email)) {
                                            if (!IsRegistration) {
                                                error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                            }
                                            else {
                                                error.showerror(allCtrlObj[i], allCtrlObj[i].attributes['InvalidErrorMessage'].value);
                                            }
                                            allCtrlObj[i].dispatchEvent(GetEvent("focus"));
                                            return false;
                                        }
                                    }
                                    break;
                                case "OEmail":
                                    var Oemail = allCtrlObj[i].value;

                                    if (allCtrlObj[i].value.length == "") {
                                        if (!IsRegistration) {
                                            error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        }
                                        else {
                                            error.showerror(allCtrlObj[i], allCtrlObj[i].attributes['ValidateMessage'].value);
                                        }
                                        allCtrlObj[i].dispatchEvent(GetEvent("focus"));
                                        return false;
                                    }
                                    else {
                                        if (!RegxEmailFilter.test(Oemail)) {
                                            if (!IsRegistration) {
                                                error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                            }
                                            else {
                                                error.showerror(allCtrlObj[i], allCtrlObj[i].attributes['ValidateMessage'].value);
                                            }
                                            allCtrlObj[i].dispatchEvent(GetEvent("focus"));
                                            return false;
                                        }
                                    }
                                    break;
                                case "Phone":
                                case "SPhone":
                                case "ALTPhone":
                                    var unmaskPhone = UnMaskPhoneNumber(allCtrlObj[i].value);
                                    var errormessage;
                                    if (!IsRegistration && inputtype == "Phone" && unmaskPhone.length == 0) {
                                        errormessage = allCtrlObj[i].attributes['validatemessage'].value;
                                    }
                                    else if (unmaskPhone.length == 0 && inputtype == "SPhone") {
                                        errormessage = allCtrlObj[i].attributes['validatemessage'].value;
                                    }
                                    else {
                                        errormessage = allCtrlObj[i].attributes['invaliderrormessage'].value ?? "";
                                    }
                                    if (unmaskPhone.length < 10) {
                                        error.showerror(allCtrlObj[i], errormessage);
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    var threenumsum = parseInt(unmaskPhone.charAt(0)) + parseInt(unmaskPhone.charAt(1)) + parseInt(unmaskPhone.charAt(2));
                                    if (threenumsum <= 1) {
                                        error.showerror(allCtrlObj[i], errormessage);
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    if (parseInt(unmaskPhone.charAt(0)) == 0) {
                                        error.showerror(allCtrlObj[i], errormessage);
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    //if (allCtrlObj[i].value.split('-')[1].length > 4) {
                                    //    error.showerror(allCtrlObj[i], errormessage);
                                    //    SetAttributes(allCtrlObj[i]);
                                    //    return false;
                                    //}
                                    break;
                                case "Time":
                                    if (!(Timeregexp.test(allCtrlObj[i].value.trim()) || Timeregexp.test(allCtrlObj[i].value.replace(/ /g, '')))) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "Card":
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {//|| document.getElementById('hdnCardtype').value == '') {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    // else if (allCtrlObj[i].value != "") {
                                    //     var s1 = 0;
                                    //     var s2 = 0;
                                    //     var num = parseInt(allCtrlObj[i].value);
                                    //     for (var k = 1; num > 0; k++) {
                                    //         if (k % 2 != 0)
                                    //             s1 = s1 + num % 10;
                                    //         else {
                                    //             test = num % 10;
                                    //             test = test * 2;
                                    //             if (test > 9) {
                                    //                 test = (test % 10) + (Math.floor(test / 10) % 10);
                                    //             }
                                    //             s2 = s2 + test;
                                    //         }
                                    //         num = Math.floor(num / 10);
                                    //     }
                                    //     var sum = s1 + s2;
                                    //     if (sum % 10 != 0) {
                                    //         error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                    //         SetAttributes(allCtrlObj[i]);
                                    //         return false;
                                    //     }
                                    // }
                                    break;
                                case "CVV":
                                    if (allCtrlObj[i].value == "000" || allCtrlObj[i].value == "") {
                                        allCtrlObj[i].value = "";
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    else if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "TxtArea":
                                    break;
                                case "Bank":
                                    if (allCtrlObj[i].value == "0000000000000000") {
                                        allCtrlObj[i].value = "";
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    //Tracker issue 9351,change bank account minlength from 8 to 5
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "ConfirmBank":
                                    if (allCtrlObj[i].visible() == true) {

                                        if (allCtrlObj[i].value.trim().length > 0) {
                                            if (allCtrlObj[i].value.trim() !== document.getElementById(allCtrlObj[i].attributes["confirmWithBankID"].value).value) {
                                                error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                                SetAttributes(allCtrlObj[i]);
                                                return false;
                                            } else if (allCtrlObj[i].value.trim() === document.getElementById(allCtrlObj[i].attributes["confirmWithBankID"].value).value) {
                                                error.hideerror(allCtrlObj[i]);
                                            }
                                        }
                                    }
                                    break;
                                case "Routing":
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    if (allCtrlObj[i].value == "000000000" || allCtrlObj[i].value == "") {
                                        allCtrlObj[i].value = "";
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        SetAttributes(allCtrlObj[i])
                                        return false;
                                    }
                                    break;
                                case "Date":
                                    if (allCtrlObj[i].value.length == "") {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'ValidateMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "SSN":
                                    // case to check for SSN field i
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    // check if value contains only zero in its field value
                                    var ssnN = parseInt(allCtrlObj[i].value, 10) != 0;
                                    if (ssnN.length === 0) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "taxid":
                                    // case to check for taxid field i
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    // check if value contains only zero in its field value
                                    var ssnN = parseInt(allCtrlObj[i].value, 10) != 0;
                                    if (ssnN.length === 0) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "FID":
                                    // case to check for FID field i
                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    // check if value contains only zero in its field value
                                    var fidV = parseInt(allCtrlObj[i].value, 10) != 0;
                                    if (!fidV) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "ZipCode":

                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    if (allCtrlObj[i].value.length != 5 && allCtrlObj[i].value.length != 10) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    // check if value contains only zero in its field value
                                    var zipV = parseInt(allCtrlObj[i].value, 10) != 0
                                    if (!zipV) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }


                                    break;
                                case "ForeignZipCode":

                                    if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    //if (allCtrlObj[i].value.length != 5 && allCtrlObj[i].value.length != 10) {
                                    //    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                    //    SetAttributes(allCtrlObj[i]);
                                    //    return false;
                                    //}
                                    // check if value contains only zero in its field value
                                    var zipV = parseInt(allCtrlObj[i].value, 10) != 0
                                    if (!zipV) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }


                                    break;
                                case "ForeignPostalCode":
                                    if (/^\d{5}(?:[\s-]\d{4})?$/.test(allCtrlObj[i].value) == false) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "Password":
                                    if (allCtrlObj[i].visible() == true) {
                                        if (allCtrlObj[i].value.trim().length > 0) {
                                            if (!passwordRegex.test(allCtrlObj[i].value.trim()) || allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                                error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                                SetAttributes(allCtrlObj[i]);
                                                return false;
                                            }
                                        }
                                    }
                                    break;
                                case "ConfirmPassword":
                                    if (allCtrlObj[i].visible() == true) {

                                        if (allCtrlObj[i].value.trim().length > 0) {
                                            if (!passwordRegex.test(allCtrlObj[i].value.trim()) || allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value) || allCtrlObj[i].value.length > parseInt(allCtrlObj[i].attributes["maxlength"].value)) {
                                                if (allCtrlObj[i].attributes["showToaster"] != undefined && allCtrlObj[i].attributes["showToaster"].value === "true") {
                                                    Toaster.error(ValidationMessage("VLD002", "Passwords do not match. Please try again."));
                                                }
                                                else {
                                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                                    SetAttributes(allCtrlObj[i]);
                                                }
                                                return false;
                                            } else if (allCtrlObj[i].value.trim() !== document.getElementById(allCtrlObj[i].attributes["confirmWithPasswordID"].value).value) {
                                                if (allCtrlObj[i].attributes["showToaster"] != undefined && allCtrlObj[i].attributes["showToaster"].value === "true") {
                                                    Toaster.error(ValidationMessage("VLD002", "Passwords do not match. Please try again."));
                                                }
                                                else {
                                                    error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                                    SetAttributes(allCtrlObj[i]);
                                                }
                                                return false;
                                            } else if (allCtrlObj[i].value.trim() !== document.getElementById(allCtrlObj[i].attributes["confirmWithPasswordID"].value).value) {
                                                error.hideerror(allCtrlObj[i]);
                                            }
                                        }
                                    }
                                    break;
                                case "Name":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "Question":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "Answer":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;

                                case "UserID":
                                    var regex;
                                    var type = allCtrlObj[i].attributes['validationtype'].value;
                                    if (type == "0") {
                                        regex = new RegExp("^[0-9]*$", 'g');
                                    }
                                    else if (type == "1") {
                                        regex = new RegExp("^([a-zA-Z0-9]+)$", 'g');
                                    }
                                    if (type != "2") {
                                        if (allCtrlObj[i].value.trim().length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.trim().length > allCtrlObj[i].attributes["maxlength"].value || allCtrlObj[i].value.indexOf(' ') > -1) {

                                            error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                            SetAttributes(allCtrlObj[i]);
                                            return false;
                                        }
                                        if (!userNameRegex.test(allCtrlObj[i].value.trim())) {
                                            error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                            SetAttributes(allCtrlObj[i]);
                                            return false;
                                        }
                                    }
                                    else {
                                        if (allCtrlObj[i].value.trim().length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.trim().length > allCtrlObj[i].attributes["maxlength"].value || allCtrlObj[i].value.indexOf(' ') > -1) {
                                            error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                            SetAttributes(allCtrlObj[i]);
                                            return false;
                                        }
                                    }
                                    break;
                                case "StreetNo":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "DL":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "AdultNumber":
                                    if (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value || allCtrlObj[i].value === "0") {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "SourceCode":
                                    if (allCtrlObj[i].value.length !== 0 && (allCtrlObj[i].value.length < allCtrlObj[i].attributes["minlength"].value || allCtrlObj[i].value.length > allCtrlObj[i].attributes["maxlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                case "Amount":
                                    // check if value contains only zero in its field value
                                    let amountVal = allCtrlObj[i].value;
                                    if (amountVal == undefined || typeof (amountVal) == "undefined") {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    else if (parseInt(allCtrlObj[i].value) <= 0) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'validatemessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    else if (allCtrlObj[i].value.length < parseInt(allCtrlObj[i].attributes["minlength"].value) || allCtrlObj[i].value.length > parseInt(allCtrlObj[i].attributes["maxlength"].value)) {
                                        error.showerror(allCtrlObj[i], getmessage(allCtrlObj[i], 'InvalidErrorMessage'));
                                        SetAttributes(allCtrlObj[i]);
                                        return false;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
}

//Show error message for control
var error = {
    showerror: function (obj, message) {
        try {
            if (obj.tagName == "SELECT") {
                obj.parentElement.parentElement.parentElement.classList.add("is-invalid");
                obj.parentElement.parentElement.parentElement.classList.add("is-invalid" + obj.id + "");
            }
            else if (obj.type == "checkbox") {
                obj.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("is-invalid");
                obj.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("is-invalid" + obj.id + "");
            }
            else
                obj.parentElement.parentElement.classList.add("is-invalid");

            if (message.length > 0) {
                if (message == 'null') {
                    message = 'Some thing went wrong';
                }
                var error_id = obj.id + 'span';
                if (!document.getElementById(error_id)) {
                    var newEl = document.createElement("span");
                    newEl.innerHTML = message;
                    newEl.classList.add("error-msg-p");
                    if (obj.id === 'isAggree')
                        newEl.classList.add("register-error-tnc");
                    newEl.id = error_id;
                    newEl.setAttribute("role", "alert");
                    insertAfter(obj, newEl)
                }
                else
                    document.getElementById(error_id).innerHTML = message;
            }
        } catch (e) {
            console.log(e.message);
        }

    },
    hideerror: function (obj) {
        try {
            obj.parentElement.parentElement.classList.remove("is-invalid");
            var span = document.getElementById(obj.id + 'span');
            if (span)
                span.remove();

        }
        catch (e) {
            console.log(e.message);
        }

    }
}
//Error message to be returned for any control.
function getmessage(obj, attribute) {
    var msg = "";
    try {
        if (obj.attributes[attribute] != undefined) {
            msg = obj.attributes[attribute].value
            if (msg == '') {
                msg = obj.attributes['title'].value
            }
        } else if (obj.attributes[attribute] == undefined) {
            msg = obj.attributes['ValidateMessage'].value
            if (msg == '') {
                msg = msg = obj.attributes['title'].value
            }
        } else if (obj.attributes['placeholder'] != undefined && (obj.localName != 'textarea')) {
            msg = obj.attributes['placeholder'].value;
        } else {
            msg = obj.attributes['title'].value
        }
        var regex = /<br\s*[\/]?>/gi;
        msg = " " +
            msg.replace(/\&lt;/g, '<').replace(/\/\&gt;/g, '>').replace(/\<br>/g, "\n").replace(/\<br\/>/g, "\n");
    } catch (e) {
        console.log(e.message);
    }
    return msg;
}

function GetEvent(eventName) {
    return new Event("focus")
}

function SetAttribute(attributeName, value) {
    var attr = document.createAttribute("" + attributeName + "")
    attr.value = value;
    return attr;
}

function SetAttributes(element) {
    element.dispatchEvent(GetEvent("focus"));
    element.setAttributeNode(SetAttribute("backgroundColor", "red"));
}
function insertAfter(referenceNode, newNode) {
    if (referenceNode.attributes["IsDate"] != undefined)
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    else if (referenceNode.tagName == "SELECT")
        referenceNode.parentElement.parentElement.parentNode.insertBefore(newNode, referenceNode.parentElement.parentElement.nextSibling);
    else if (referenceNode.type == "checkbox")
        referenceNode.parentElement.parentElement.parentElement.parentNode.insertBefore(newNode, referenceNode.parentElement.parentElement.parentElement.nextSibling);
    else
        referenceNode.parentElement.parentNode.insertBefore(newNode, referenceNode.parentElement.nextSibling);
}


export function NumericOnly(value) {
    //
    if (value && value.length > 0)
        return value.replace(/[^0-9]/g, '')
    return value;
}

export function AlphaNumericOnly(value) {
    if (value && value.length > 0)
        return value.replace(/[^0-9a-zA-Z]/g, '')
    return value;
}
export function AlphaNumericOnlyWithSpace(value) {
    if (value && value.length > 0)
        return value.replace(/[^0-9a-zA-Z ]/g, '')
    return value;
}
export function AlphaNumericOnlyWithSpaceAndHyphen(value) {
    if (value && value.length > 0)
        return value.replace(/[^0-9a-zA-Z -]/g, '')
    return value;
}
export function PreventSpace(value) {
    if (value && value.length > 0)
        value = value.replace(/\s/g, "");
    return value;
}

export function RemoveInvalidError(tblids) {

    var tblid = [];
    if (tblids.indexOf(',') > 0) {
        tblid = tblids.split(',');
    }
    else {
        tblid.push(tblids);
    }
    for (var i = 0; i < tblid.length; i++) {
        // var contL = document.querySelectorAll('#' + tblid[i] + ' input[type=text],input[type=password],textarea');
        var ctrls = document.querySelectorAll('#' + tblid[i] + ' input[mandatory="1"],textarea[mandatory="1"],select[mandatory="1"],canvas[mandatory="1"],md-select[mandatory="1"]');
        for (var j = 0; j < ctrls.length; j++) {
            if (ctrls[j].visible() == true) {
                let obj = ctrls[j];
                try {
                    obj.parentElement.parentElement.classList.remove("error-invalid-p");
                    obj.classList.remove("error-invalid");

                    //For select type element removeone level more error-invalid
                    if (obj.nodeName == "SELECT") {
                        obj.parentElement.parentElement.parentElement.classList.remove("error-invalid-p");
                    }

                    var span = document.getElementById(obj.id + 'span');
                    if (span)
                        span.remove();

                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
    }
}

export function RemoveInvalidErrorById(tblid) {

    if (tblid.length > 0) {
        let ctrlAttribute = document.getElementById(tblid)
        if (ctrlAttribute != undefined && ctrlAttribute.visible() == true) {
            let obj = ctrlAttribute;
            try {
                obj.parentElement.parentElement.classList.remove("error-invalid-p");
                obj.classList.remove("error-invalid");

                //For select type element removeone level more error-invalid
                if (obj.nodeName == "SELECT") {
                    obj.parentElement.parentElement.parentElement.classList.remove("error-invalid-p");
                }
                obj.parentElement.parentElement.classList.remove("is-invalid");
                var span = document.getElementById(obj.id + 'span');
                if (span)
                    span.remove();

            }
            catch (e) {
                console.log(e.message);
            }
        }
    }
}

export function removeSelectTargetErrorClass(target) {
    if (event.target.classList.contains("error-invalid")) {
        event.target.classList.remove("error-invalid")
        event.target.parentElement.parentElement.parentElement.classList.remove("error-invalid-p")
    }
    if (target.parentElement != undefined && target.parentElement.parentElement != undefined && target.parentElement.parentElement.parentElement.classList != undefined && target.parentElement.parentElement.parentElement.classList.contains("is-invalid")) {
        var minLength = parseInt(target.attributes["minlength"] != undefined ? target.attributes["minlength"].value : 0);
        if (minLength, target.value.length >= minLength)
            target.parentElement.parentElement.parentElement.classList.remove("is-invalid")
    }
}

export function ValidateSingleField(tblid) {
    let ctrlMandatory = document.getElementById(tblid).attributes['mandatory']
    let ctrlAttribute = document.getElementById(tblid)
    if (ctrlMandatory == undefined)
        return true;

    if (ctrlMandatory.value != "1")
        return true;

    if (ctrlAttribute != "") {
        var inputtype = ctrlAttribute.attributes['InputType'] != undefined ? ctrlAttribute.attributes['InputType'].value : "";
        if (ctrlAttribute.value != null) {

            switch (inputtype) {
                case "AccountNumber":
                    // check if value contains only zero in its field value
                    var acc = parseInt(ctrlAttribute.value, 10) != 0
                    if (!acc) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute)
                        return false;
                    }
                    if (ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value) || ctrlAttribute.value.length > parseInt(ctrlAttribute.attributes["maxlength"].value)) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute)
                        return false;
                    }
                    break;
                case "Email":
                    var email = ctrlAttribute.value;
                    if (ctrlAttribute.value.length == "") {
                        if (!IsRegistration) {
                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        }
                        else {
                            error.showerror(ctrlAttribute, ctrlAttribute.attributes['InvalidErrorMessage'].value);
                        }
                        ctrlAttribute.dispatchEvent(GetEvent("focus"));
                        return false;
                    }
                    else {
                        if (!RegxEmailFilter.test(email)) {
                            if (!IsRegistration) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                            }
                            else {
                                error.showerror(ctrlAttribute, ctrlAttribute.attributes['InvalidErrorMessage'].value);
                            }
                            ctrlAttribute.dispatchEvent(GetEvent("focus"));
                            return false;
                        }
                    }
                    break;
                case "OEmail":
                    var Oemail = ctrlAttribute.value;

                    if (ctrlAttribute.value.length == "") {
                        if (!IsRegistration) {
                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        }
                        else {
                            error.showerror(ctrlAttribute, ctrlAttribute.attributes['ValidateMessage'].value);
                        }
                        ctrlAttribute.dispatchEvent(GetEvent("focus"));
                        return false;
                    }
                    else {
                        if (!RegxEmailFilter.test(Oemail)) {
                            if (!IsRegistration) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                            }
                            else {
                                error.showerror(ctrlAttribute, ctrlAttribute.attributes['ValidateMessage'].value);
                            }
                            ctrlAttribute.dispatchEvent(GetEvent("focus"));
                            return false;
                        }
                    }
                    break;
                case "Phone":
                case "SPhone":
                case "ALTPhone":
                    //Change validation expression if any phone number starting with 0 then control displays error message.
                    //bug id 24617
                    var errormessage;
                    if (!IsRegistration && inputtype == "Phone" && ctrlAttribute.value.length == 0) {
                        errormessage = ctrlAttribute.attributes['validatemessage'].value;
                    }
                    else if (ctrlAttribute.value.length == 0 && inputtype == "SPhone") {
                        errormessage = ctrlAttribute.attributes['validatemessage'].value;
                    }
                    else {
                        errormessage = ctrlAttribute.attributes['invaliderrormessage'].value ?? "";
                    }
                    if ((ctrlAttribute.value.length < 14) || !(ctrlAttribute.value.lastIndexOf('-') == 9)) {
                        error.showerror(ctrlAttribute, errormessage);
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    var threenumsum = parseInt(ctrlAttribute.value.charAt(1)) + parseInt(ctrlAttribute.value.charAt(2)) + parseInt(ctrlAttribute.value.charAt(3));
                    if (threenumsum <= 1) {
                        error.showerror(ctrlAttribute, errormessage);
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    if (parseInt(ctrlAttribute.value.charAt(1)) == 0) {
                        error.showerror(ctrlAttribute, errormessage);
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    if (ctrlAttribute.value.split('-')[1].length > 4) {
                        error.showerror(ctrlAttribute, errormessage);
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "Time":
                    if (!(Timeregexp.test(ctrlAttribute.value.trim()) || Timeregexp.test(ctrlAttribute.value.replace(/ /g, '')))) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "Card":
                    if (((ctrlAttribute.value.length > 19) && ((ctrlAttribute.value.length < 8))) || document.getElementById('hdnCardtype').value == '') {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    else if (ctrlAttribute.value != "") {
                        var s1 = 0;
                        var s2 = 0;
                        var num = parseInt(ctrlAttribute.value);
                        for (var k = 1; num > 0; k++) {
                            if (k % 2 != 0)
                                s1 = s1 + num % 10;
                            else {
                                test = num % 10;
                                test = test * 2;
                                if (test > 9) {
                                    test = (test % 10) + (Math.floor(test / 10) % 10);
                                }
                                s2 = s2 + test;
                            }
                            num = Math.floor(num / 10);
                        }
                        var sum = s1 + s2;
                        if (sum % 10 != 0) {
                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                            SetAttributes(ctrlAttribute);
                            return false;
                        }
                    }
                    break;
                case "CVV":
                    if (ctrlAttribute.value == "000") {
                        ctrlAttribute.value = "";
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    else if (ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value)) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "TxtArea":
                    break;
                case "Bank":

                    if (ctrlAttribute.value == "0000000000000000" || ctrlAttribute.value == "") {
                        ctrlAttribute.value = "";
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    //Tracker issue 9351,change bank account minlength from 8 to 5
                    if (ctrlAttribute.value.length < 5) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "ConfirmBank":

                    if (ctrlAttribute.visible() == true) {

                        if (ctrlAttribute.value.trim().length > 0) {
                            if (!strongRegex.test(ctrlAttribute.value.trim()) || ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value) || ctrlAttribute.value.length > parseInt(ctrlAttribute.attributes["maxlength"].value)) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                                SetAttributes(ctrlAttribute);
                                return false;
                            } else if (ctrlAttribute.value.trim() !== document.getElementById(ctrlAttribute.attributes["confirmWithBankID"].value).value) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                                SetAttributes(ctrlAttribute);
                                return false;
                            } else if (ctrlAttribute.value.trim() === document.getElementById(ctrlAttribute.attributes["confirmWithBankID"].value).value) {
                                error.hideerror(ctrlAttribute);
                            }
                        }
                    }
                    break;
                case "Routing":
                    if (ctrlAttribute.value.length < 9) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    if (ctrlAttribute.value == "000000000") {
                        ctrlAttribute.value = "";
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute)
                        return false;
                    }
                    break;
                case "Date":
                    if (ctrlAttribute.value.length == "") {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'ValidateMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "SSN":
                    // case to check for SSN field i
                    if (ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value)) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    // check if value contains only zero in its field value
                    var ssnN = parseInt(ctrlAttribute.value, 10) != 0;
                    if (ssnN.length === 0) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "FID":
                    // case to check for FID field i
                    if (ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value)) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    // check if value contains only zero in its field value
                    var fidV = parseInt(ctrlAttribute.value, 10) != 0;
                    if (!fidV) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "ZipCode":

                    if (ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value)) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    // check if value contains only zero in its field value
                    var zipV = parseInt(ctrlAttribute.value, 10) != 0
                    if (!zipV) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "Password":
                    if (ctrlAttribute.visible() == true) {
                        if (ctrlAttribute.value.trim().length > 0) {
                            if (!passwordRegex.test(ctrlAttribute.value.trim()) || ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                                SetAttributes(ctrlAttribute);
                                return false;
                            }
                        }
                    }
                    break;
                case "ConfirmPassword":
                    if (ctrlAttribute.visible() == true) {

                        if (ctrlAttribute.value.trim().length > 0) {
                            if (!passwordRegex.test(ctrlAttribute.value.trim()) || ctrlAttribute.value.length < parseInt(ctrlAttribute.attributes["minlength"].value) || ctrlAttribute.value.length > parseInt(ctrlAttribute.attributes["maxlength"].value)) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                                SetAttributes(ctrlAttribute);
                                return false;
                            } else if (ctrlAttribute.value.trim() !== document.getElementById(ctrlAttribute.attributes["confirmWithPasswordID"].value).value) {
                                error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                                SetAttributes(ctrlAttribute);
                                return false;
                            } else if (ctrlAttribute.value.trim() === document.getElementById(ctrlAttribute.attributes["confirmWithPasswordID"].value).value) {
                                error.hideerror(ctrlAttribute);
                            }
                        }
                    }
                    break;
                case "Name":
                    if (ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "Question":
                    if (ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "Answer":
                    if (ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;

                case "UserID":
                    var regex;
                    var type = ctrlAttribute.attributes['validationtype'].value;
                    if (type == "0") {
                        regex = new RegExp("^[0-9]*$", 'g');
                    }
                    else if (type == "1") {
                        regex = new RegExp("^([a-zA-Z0-9]+)$", 'g');
                    }
                    if (type != "2") {
                        if (ctrlAttribute.value.trim().length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.trim().length > ctrlAttribute.attributes["maxlength"].value || ctrlAttribute.value.indexOf(' ') > -1) {

                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                            SetAttributes(ctrlAttribute);
                            return false;
                        }
                        if (!userNameRegex.test(ctrlAttribute.value.trim())) {
                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                            SetAttributes(ctrlAttribute);
                            return false;
                        }
                    }
                    else {
                        if (ctrlAttribute.value.trim().length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.trim().length > ctrlAttribute.attributes["maxlength"].value || ctrlAttribute.value.indexOf(' ') > -1) {
                            error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                            SetAttributes(ctrlAttribute);
                            return false;
                        }
                    }
                    break;
                case "StreetNo":
                    if (ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                case "DL":
                    if (ctrlAttribute.value.length < ctrlAttribute.attributes["minlength"].value || ctrlAttribute.value.length > ctrlAttribute.attributes["maxlength"].value) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                case "chk":
                    if (!ctrlAttribute.checked) {
                        error.showerror(ctrlAttribute, getmessage(ctrlAttribute, 'InvalidErrorMessage'));
                        SetAttributes(ctrlAttribute);
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return true;
}

export function CheckIfResponseIfNullOrEmpty(response) {
    if (response == null || response == undefined || response == '' || Object.keys(response).length === 0) {
        return true;
    }
    if (response.status == null || response.status == undefined || response.status == '' ||
        Object.keys(response.status).length === 0) {
        return true;
    }
    return false;
}

export function isObjectEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function CheckIfNullOrEmpty(val) {

    if (val == null || val == undefined || val == '') {
        return true;
    }
    return false;
}


// Disable cut, copy, paste
export function HandleCutCopyPasteRule(event) {
    event.preventDefault();
}

// check if all input tage name is select and error id attribut is 'DOB'
function CheckIfInputSelectandErrorIdDOB(ctrlObj) {
    var allSelectandErrorIdDOB = true;
    for (var i = 0; i < ctrlObj.length; i++) {
        //check if tag name is Select
        if (ctrlObj[i].tagName == "SELECT") {
            if (!(ctrlObj[i].attributes["errorid"] != undefined && ctrlObj[i].attributes["errorid"] != null && ctrlObj[i].attributes["errorid"].value === "DOB")) {
                allSelectandErrorIdDOB = false;
                break;
            }
        }
        else {
            allSelectandErrorIdDOB = false;
            break;
        }
    }
    return allSelectandErrorIdDOB;
}
