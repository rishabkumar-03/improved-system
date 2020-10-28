import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/Usecse1Class.getAccounts';

export default class PresentationComponent extends LightningElement {
    error;
    @track accounts;
    @track accFromButton;

    @track columns = [
        { label: 'Name', fieldName: 'Name', type: 'String' },
        { label: 'Phone', fieldName: 'Phone', type: 'String' }
    ];


    @wire(getAccounts) accountsRecieved({error, data}){
        if(data){
            this.accounts = data;
            this.error = undefined;
        }
        if(error){
            this.error = error;
            this.data = undefined;
            console.log(error.getMessage());
        }
    }
    
    handleClick(){
        getAccounts().then(result => {
            this.accFromButton = result;
        }).catch(error => { console.log('Some error') });
    }
}