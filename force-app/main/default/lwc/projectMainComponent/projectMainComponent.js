import { LightningElement, wire, api } from 'lwc';
import productTileGrid from './productTileGrid.html';
import productTileList from './productTileList.html';
import { publish,subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';
import getProducts from '@salesforce/apex/NewController.getProducts';

import getTotalProducts from '@salesforce/apex/NewController.getTotalProducts';
//import getProductsByCategory from '@salesforce/apex/NewController.getProductsByCategory';
import choc from '@salesforce/resourceUrl/chocolate';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

export default class ProjectMainComponent extends NavigationMixin(LightningElement) { 
    @api recordId;
    @api total_records;
    @api pageSize = 6;
    @api total_pages = 3;
    @api page = 1;
    productTileGrid = true ;
    products;
    searchkey = '';
    @api category_name = '' ;
    brand = '';
    makers = '';
    price = 500;
    isSort = false;
    chocolate_picture = choc;
   

    @wire(MessageContext) messageContext;

    connectedCallback(){ 
        this.subscribeMC();
    }

    @wire(getProducts,{ prodName : '$searchkey', 
            catName : '$category_name',
            brand : '$brand',
            makers : '$makers', 
            maxRange : '$price', 
            isSort : '$isSort',
            pageSize : '$pageSize',
            pageNo : '$page'
            })
    wiredProducts({error, data}){ 
        if(data){ 
            this.products = data;
            console.log('Data received',data);
            this.error = undefined;
        }if(error){ 
            console.error(error);
            this.data = undefined;
        }
    }

    

    @wire(getTotalProducts) received({error, data}){ 
        if(data){ 
            this.total_records = data;
        }
    };


    render(){ 
        return this.productTileGrid ? productTileGrid : productTileList ;
    }

    
    previousHandler(){
        if(this.page > 1){
            this.page = this.page - 1;
        }
    }

    nextHandler(){
        this.page = this.page + 1;
    }

    subscribeMC(){ 
        // console.log('Subsciber working');
        // if (!this.subscription) {
        //     this.subscription = subscribe(
        //         this.messageContext,
        //         SAMPLEMC,
        //        (message) => this.handleMessage(message),
        //     );
        // }
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC, (message) => {
                this.handleMessage(message);
            }, {scope:APPLICATION_SCOPE});
    }

    handleMessage(message){ 
        if(message.inputType == 'view'){ 
            this.productTileGrid = message.inputMessage;
            console.log('View received',this.productTileGrid);
        }
        if(message.inputType == 'dropDownProduct'){ 
            this.searchkey = message.inputMessage;
            this.page = 1;
        }
        if(message.inputType == 'reset'){ 
            this.searchkey = message.inputMessage;
            this.page = 1;
        }
        // if(message.inputType == 'global'){ 
        //     this.search_global = message.inputMessage;
        //     console.log('searchItem received:', this.search_global);
        //     getGlobalSearch({searchItem : this.search_global}).then( result => { 
        //         this.products = result;
        //         console.log(result);
        //     }).catch( error => { console.error(error);})
        // }
        // if(message.inputType == 'close'){ 
        //     this.search_global = message.inputMessage;
        //     console.log('searchItem received:', this.search_global);
        //     getGlobalSearch({searchItem : this.search_global}).then( result => { 
        //         this.products = result;
        //         console.log(result);
        //     }).catch( error => { console.error(error);})
        // }
        if(message.inputType == 'sorting'){ 
            this.isSort = message.inputMessage;
            console.log('sorting value', this.isSort);
        }
        if(message.inputType == 'range_slider'){ 
            this.price = message.inputMessage;
            console.log(this.price);
        }
        // if(message.inputType == 'category'){ 
        //     this.category_name = message.inputMessage;
        //     console.log('received category', this.category);
        //     //refreshApex(this.products);
        //  }
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
    // const message = { 
    //     inputMessage : received,
    //     inputType : 'checkout'
    // }
    // publish(this.messageContext, SAMPLEMC, message);
    // }
}