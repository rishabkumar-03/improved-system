import { LightningElement, api, wire } from 'lwc';
import getPrice from '@salesforce/apex/PriceGetter.priceFromApexMethod';
import getProductImage from '@salesforce/apex/NewController.getProductImage';

export default class Tile extends LightningElement {
    product_image;
    @api price;
    @api productName;

    @wire(getProductImage,{ prodName : '$productName'}) wiredImage({error, data}){ 
        if(data){ 
            this.product_image = data.Product_Image__c;
            console.log('Image reveived',product_image )
        }if(error){ 
            console.error(error);
        }
    }

    //use apex here to get price and other details
    @wire(getPrice, {Name : '$productName'})
    getsPriceFromApex({error, data}){
        if(data){
            this.price = data.Price__c;
            // console.log(data);
        }
         if(error){
            console.log('Error');
        }
    }

    handlelog()
    {
        console.log(data);
    }
}