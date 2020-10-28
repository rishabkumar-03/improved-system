import { LightningElement, wire } from 'lwc';
import getDropDownBrands from '@salesforce/apex/NewController.getDropDownBrands';
import getDropDownProducts from '@salesforce/apex/NewController.getDropDownProducts';
import { createRecordInputFilteredByEditedFields } from 'lightning/uiRecordApi';

let i=0;

export default class DropDownComp extends LightningElement { 
    product;
    brand = '';
    value = '';
    brand_options = [];
    prod_options = [];

    @wire(getDropDownBrands) wiredBrands({error, data}){ 
        if(data){ 
            for(i=0;i<data.length;i++){ 
                this.brand_options = [...this.brand_options, { value : data[i].Brand__c, label : data[i].Brand__c}];
            }
        } if(error){ 
            console.log(error);
        }
    }

    get brandOptions(){ 
        return this.brand_options;
    }

    handleBrandChange(event){ 
        const selectedOption = event.detail.value;
        this.brand = selectedOption;
    }

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

    handleProductChange(event){ 
        const selectedOption = event.detail.value;
        this.product = selectedOption;
    }
}