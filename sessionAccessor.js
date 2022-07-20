import Storage from "./../common/storage";
import { Session } from './../common/session';


class SessionAccessor {
    static set Name(value) { Storage.set(Session.Name, value) }
    static get Name() { return Storage.get(Session.Name) }

    static set AccountNumber(value) { Storage.set(Session.AccountNumber, value) }
    static get AccountNumber() { return Storage.get(Session.AccountNumber) }

    static set AccountType(value) { Storage.set(Session.AccountType, value) }
    static get AccountType() { return Storage.get(Session.AccountType) }

    static set CustomerType(value) { Storage.set(Session.CustomerType, value) }
    static get CustomerType() { return Storage.get(Session.CustomerType) }

    static set BPNumber(value) { Storage.set(Session.BPNumber, value) }
    static get BPNumber() { return Storage.get(Session.BPNumber) }

    static set UserID(value) { Storage.set(Session.UserID, value) }
    static get UserID() { return Storage.get(Session.UserID) }

    static set Email(value) { Storage.set(Session.Email, value) }
    static get Email() { return Storage.get(Session.Email) }

    static set AccountAddress(value) { Storage.set(Session.AccountAddress, value) }
    static get AccountAddress() { return Storage.get(Session.AccountAddress) }

    static set Address1(value) { Storage.set(Session.Address1, value) }
    static get Address1() { return Storage.get(Session.Address1) }

    static set Address2(value) { Storage.set(Session.Address2, value) }
    static get Address2() { return Storage.get(Session.Address2) }

    static set City(value) { Storage.set(Session.City, value) }
    static get City() { return Storage.get(Session.City) }

    static set State(value) { Storage.set(Session.State, value) }
    static get State() { return Storage.get(Session.State) }

    static set Country(value) { Storage.set(Session.Country, value) }
    static get Country() { return Storage.get(Session.Country) }

    static set PostalCode(value) { Storage.set(Session.PostalCode, value) }
    static get PostalCode() { return Storage.get(Session.PostalCode) }
    static set IPAddress(value) { Storage.set(Session.IPAddress, value) }
    static get IPAddress() { return Storage.get(Session.IPAddress) }

    static set FirstName(value) { Storage.set(Session.FirstName, value) }
    static get FirstName() { return Storage.get(Session.FirstName) }
    static set MiddleName(value) { Storage.set(Session.MiddleName, value) }
    static get MiddleName() { return Storage.get(Session.MiddleName) }
    static set LastName(value) { Storage.set(Session.LastName, value) }
    static get LastName() { return Storage.get(Session.LastName) }
    static set FullName(value) { Storage.set(Session.FullName, value) }
    static get FullName() { return Storage.get(Session.FullName) }

    static set ServiceAddressPremiseId(value) { Storage.set(Session.ServiceAddressPremiseId, value) }
    static get ServiceAddressPremiseId() { return Storage.get(Session.ServiceAddressPremiseId) }

    static set BrowserDeviceID(value) { Storage.set(Session.BrowserDeviceID, value) }
    static get BrowserDeviceID() { return Storage.get(Session.BrowserDeviceID) }

    static set TwoFactorAuthenticated(value) { Storage.set(Session.TwoFactorAuthenticated, value) }
    static get TwoFactorAuthenticated() { return Storage.get(Session.TwoFactorAuthenticated) }

    static set InboxUnreadCount(value) { Storage.set(Session.InboxUnreadCount, value) }
    static get InboxUnreadCount() { return Storage.get(Session.InboxUnreadCount) }

    static set MobileNumber(value) { Storage.set(Session.MobileNumber, value) }
    static get MobileNumber() { return Storage.get(Session.MobileNumber) }

    static set AccountId(value) { Storage.set(Session.AccountId, value) }
    static get AccountId() { return Storage.get(Session.AccountId) }

    static set ServiceAddress(value) { Storage.set(Session.ServiceAddress, value) }
    static get ServiceAddress() { return Storage.get(Session.ServiceAddress) }

    static set AccountStatus(value) { Storage.set(Session.AccountStatus, value) }
    static get AccountStatus() { return Storage.get(Session.AccountStatus) }

    static set BPName(value) { Storage.set(Session.BPName, value) }
    static get BPName() { return Storage.get(Session.BPName) }

    static set IsMigratedUser(value) { Storage.set(Session.IsMigratedUser, value) }
    static get IsMigratedUser() { return Storage.get(Session.IsMigratedUser) }

    static set SessionId(value) { Storage.set(Session.SessionId, value) }
    static get SessionId() { return Storage.get(Session.SessionId) }
    
    static set WorkflowGUID(value) { Storage.set(Session.WorkflowGUID, value) }
    static get WorkflowGUID() { return Storage.get(Session.WorkflowGUID) }

    static set RoleId(value) { Storage.set(Session.RoleId, value) }
    static get RoleId() { return Storage.get(Session.RoleId) }

    static set AllowAsPreLoginAPI(value) { Storage.set(Session.AllowAsPreLoginAPI, value) }
    static get AllowAsPreLoginAPI() { return Storage.get(Session.AllowAsPreLoginAPI) }

    static set AccessToken(value) { Storage.set(Session.AccessToken, value) }
    static get AccessToken() { return Storage.get(Session.AccessToken) }
}

export default SessionAccessor;

