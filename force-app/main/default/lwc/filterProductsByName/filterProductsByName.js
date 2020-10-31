import { LightningElement, wire, api } from 'lwc';
import getDropDownProducts from '@salesforce/apex/NewController.getDropDownProducts';
import { publish,subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';


let i=0;

export default class FilterProductsByName extends LightningElement { 
    @api brand='';
    product = '';
    value = '';
    prod_options = [ {value : '', label : 'None'}];

    connectedCallback(){ 
        this.subscribeMC();
    }

    @wire(MessageContext) messageContext;

    @wire(getDropDownProducts,{ brand : '$brand'}) wiredProducts({error, data}){ 
        if(data){ 
            this.prod_options.splice(0,this.prod_options.length);
            for(i=0;i<data.length;i++){ 
                this.prod_options = [...this.prod_options, { value : data[i].Name, label : data[i].Name}];
            }
        } if(error){ 
            console.log(error);
        }
    }

    get productOptions(){ 
        return this.prod_options;
    }

    subscribeMC(){ 
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC, (message) => {
                this.handleMessage(message);
            }, {scope:APPLICATION_SCOPE});
    }

    handleMessage(message){ 
        if(message.inputType == 'dropDownBrand'){ 
            this.brand = message.inputMessage;
        }
    }

    handleProductChange(event){ 
        console.log('Brand:',this.brand);
        const selectedOption = event.detail.value;
        this.product = selectedOption;
        const message = { 
            inputMessage : this.product,
            inputType : 'dropDownProduct'
        }
        publish(this.messageContext, SAMPLEMC, message);
    }

    handleReset(event){ 
        this.brand = '';
        this.product = '';
        const message = { 
            inputMessage : this.product,
            inputType : 'reset'
        }
        publish(this.messageContext, SAMPLEMC, message);
    }
}