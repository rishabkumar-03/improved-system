import { LightningElement, wire, api } from 'lwc';
import getGlobalSearch from '@salesforce/apex/NewController.getGlobalSearch';
import choc from '@salesforce/resourceUrl/chocolate';
import { publish,subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class GlobalSearchComponent extends LightningElement { 
    products;
    @api search_global = '';
    chocolate_picture = choc;

    //@wire(MessageContext) messageContext;

    @wire(getGlobalSearch,{searchItem : '$search_global'}) getWiredProducts({error,data}){ 
        if(data){ 
            this.products = data;
            console.log('global data', data);
        }if(error){ 
            console.error(error);
        }
    }

    navigatetoDetails(event){
        const received = event.currentTarget.dataset.value;
        console.log('Received from anchor tag : ', received);
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: { 
                componentName : "c__checkoutComponent"
            },
            state : { 
                c__productName : received
            }
    });
}
}