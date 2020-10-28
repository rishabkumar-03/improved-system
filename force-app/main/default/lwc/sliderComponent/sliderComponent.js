import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class SliderComponent extends LightningElement { 
    price=500;

    @wire(MessageContext)
    messageContext;

    handleRange(event){ 
        this.price  = event.target.value;
        const message = {
            inputMessage: this.price,
            inputType : 'range_slider'
            };
        publish(this.messageContext, SAMPLEMC, message);
    }
}