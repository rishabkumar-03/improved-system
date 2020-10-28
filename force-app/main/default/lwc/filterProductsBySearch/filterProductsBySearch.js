import { LightningElement, wire, api } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';
import { NavigationMixin } from 'lightning/navigation';

export default class FilterProductsBySearch extends NavigationMixin(LightningElement) { 
    @api search_global;

    // @wire(MessageContext)
    // messageContext;

    handleGlobal(event){ 
        const input =  this.template.querySelector('lightning-input').value;
        console.log('button being called');
        console.log('input data', this.search_global);
    //     const message = { 
    //         inputMessage : this.search_global,
    //         inputType : 'global'
    //     }
    //    publish(this.messageContext, SAMPLEMC, message);

       this[NavigationMixin.Navigate]({
        type: "standard__component",
        attributes: {
            componentName : "c__projectNavigationGlobal"
        },
        state: { 
            c__search_global : input
        }
       });
    }

    // handleClose(event){ 
    //     //document.getElementById('searchGlobally').value = '';
    //     this.search_global = '';
    //     const message = { 
    //         inputMessage : this.search_global,
    //         inputType : 'close'
    //     }
    //     publish(this.messageContext, SAMPLEMC, message);
    // }
}