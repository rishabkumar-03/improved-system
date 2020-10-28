import { LightningElement, wire } from 'lwc';
import Chips from '@salesforce/resourceUrl/Chips';
import Desserts from '@salesforce/resourceUrl/Desserts';
import Chats from '@salesforce/resourceUrl/Chats';
import Chocos from '@salesforce/resourceUrl/Chocos';
import Beverages from '@salesforce/resourceUrl/Beverage';
import { NavigationMixin } from 'lightning/navigation';
import { publish, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class CarouselHome extends NavigationMixin(LightningElement) {
    Chips = Chips;
    Desserts = Desserts;
    Chats = Chats;
    Chocos = Chocos;
    Beverages = Beverages;

    @wire(MessageContext)
    messageContext;

    handleChips(event){
        // const message = {
        //     inputMessage: 'snacks',
        //     inputType: 'category'
        //     };
        // publish(this.messageContext, SAMPLEMC, message);
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__projectNavigation"
            },
            state : { 
                c__category_name : 'snacks'
            }
        });
        
    }

    handleDesserts(){
        // const message = { 
        //     inputMessage : 'desserts',
        //     inputType : 'category'
        // }
        // publish(this.messageContext, SAMPLEMC, message);
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__projectNavigation"
            },
            state : { 
                c__category_name : 'desserts'
            }
        });
        
    }


    handleChocos(){
        // const message = { 
        //     inputMessage : 'candies',
        //     inputType : 'category'
        // }
        // publish(this.messageContext, SAMPLEMC, message);
        console.log('test chocos');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__projectNavigation"
            },
            state : { 
                c__category_name : 'candies'
            }
        });
        
    }

    handleBeverages(){
        // const message = { 
        //     inputMessage : 'beverages',
        //     inputType : 'category'
        // }
        // publish(this.messageContext, SAMPLEMC, message);
        console.log('test Beverages');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__projectNavigation"
            },
            state : { 
                c__category_name : 'beverages'
            }
        });
    }

    handleChats(){
        // const message = { 
        //     inputMessage : 'chats',
        //     inputType : 'category'
        // }
        // publish(this.messageContext, SAMPLEMC, message);
        console.log('test Chats');
        this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName : "c__projectNavigation"
            },
            state : { 
                c__category_name : 'chats'
            }
        });
        
    }
}