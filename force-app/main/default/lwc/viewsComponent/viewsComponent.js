import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class ViewsComponent extends LightningElement { 
    
    showGrid = true;

    @wire(MessageContext)
    messageContext;

    handleList(){ 
        //this.showComp = this.showComp === true ? false : true;
        const message = {
            inputMessage: !this.showGrid,
            inputType: 'view'
            };
        publish(this.messageContext, SAMPLEMC, message);
    }
    handleGrid(){ 
        const message = {
            inputMessage: this.showGrid,
            inputType: 'view'
            };
        publish(this.messageContext, SAMPLEMC, message);
    }
}