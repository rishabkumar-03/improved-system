import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Account_Name from '@salesforce/schema/Account.Name';
import getContacts from '@salesforce/apex/NewController.getContacts';
import getOpps from '@salesforce/apex/NewController.getOpps';

const FIELDS = [
    'Account.Name',
    'Account.Type',
    'Account.Phone',
    'Account.Owner',
    'Account.Website',
    'Account.Industry'
];
export default class MainComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
    
    @wire(getContacts,{ accId: '$recordId'}) contacts;
    @wire(getOpps, {accId: '$recordId'}) opportunities; 

    accountObject = ACCOUNT_OBJECT;

    @wire(getRecord, { recordId: '$recordId', fields: [Account_Name] })
    record;

    connectedCallback(){
        this.searchKey = this.recordId;
    }

    /*handleRelated(){ 
        
    
        console.log('Related is being called');
        console.log(this.recordId);

        getContacts({accId: '$recordId'}).then( response => {
            this.contacts= response.data;
            console.log('contacts : ', response);
        }).catch( error =>
                { console.error(error)});

        getOpps({accId: '$recordId'}).then( response => {
            this.opportunities = response.data;
            console.log('opps: ', response);
        }).catch( error =>
                { console.error(error)});
    } */

    get nameValue() {
        return this.record.data ? getFieldValue(this.record.data, Account_Name) : '';
    }
}