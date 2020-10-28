import { LightningElement, wire, track } from 'lwc';
import getContactsForDynamicFilter from '@salesforce/apex/NewController.getContactsForDynamicFilter';
import getContactByName from '@salesforce/apex/NewController.getContactByName';

export default class UseCase5ComponentOne extends LightningElement {
    user_input = '';
    error;
    contacts = [];  

    @wire(getContactByName,{ conName : '$user_input'}) wiredContacts({error, data}){
        if(data){
            this.contacts = data;
            this.error = undefined;
        }
        if(error){
            this.error = error;
            this.data = undefined;
        }
    }; 

    handleInput(event){
        this.user_input = event.target.value;
        console.log('Value entered',user_input);

    } 
}