import { LightningElement, wire, api } from 'lwc';
import getDropDownBrands from '@salesforce/apex/NewController.getDropDownBrands';
import getProducts from '@salesforce/apex/NewController.getProducts';

let i=0;

export default class FilterProductsByBrand extends LightningElement { 
    @api category_name ;
    pageSize = 6;
    page = 1;
    searchkey = '';
    brand_name = '';
    makers = '';
    price = 500;
    isSort = false;
    brand = '';
    value = '';
    brand_options = [ { value : '', label : 'None'}];

    // @wire(getDropDownBrands) wiredBrands({error, data}){ 
    //     if(data){ 
    //         for(i=0;i<data.length;i++){ 
    //             this.brand_options = [...this.brand_options, { value : data[i].Brand__c, label : data[i].Brand__c}];
    //         }
    //     } if(error){ 
    //         console.log(error);
    //     }
    // }

    @wire(getProducts,{ prodName : '$searchkey', 
            catName : '$category_name',
            brand : '$brand_name',
            makers : '$makers', 
            maxRange : '$price', 
            isSort : '$isSort',
            pageSize : '$pageSize',
            pageNo : '$page'
            }) wiredBrands({error, data}){ 
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
}