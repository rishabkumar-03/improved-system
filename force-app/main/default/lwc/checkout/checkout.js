import { LightningElement, wire,  api } from 'lwc';
import getProductImage from '@salesforce/apex/NewController.getProductImage';


export default class Checkout extends LightningElement {

    url;
    catName;
    @api productName;

    @wire(getProductImage, { prodName : '$productName'}) wiredProducts({error, data}){ 
        if(data){ 
            this.catName = data.Category_Name__c;
            console.log(this.catName);
            this.url = 'https://resilient-panda-49v1w9-dev-ed.lightning.force.com/lightning/cmp/c__projectNavigation?c__category_name=' + this.catName;
        }if(error){ 
            console.error(error);
        }
    }

    handlechild(){
        console.log('Child');
    }

    handleparent(){
        console.log('Parent');
 
    }
}