import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class SortingComponent extends LightningElement { 

    isSort = false;

    @wire(MessageContext)
    messageContext;

    handleSort(event){ 
        this.isSort = !this.isSort;
        const message = {
            inputMessage: this.isSort,
            inputType : 'sorting'
            };
        publish(this.messageContext, SAMPLEMC, message);
    }
}