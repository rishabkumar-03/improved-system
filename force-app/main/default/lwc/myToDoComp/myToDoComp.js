import { LightningElement, track } from 'lwc';

export default class MyToDoComp extends LightningElement {

    @track time ="8:20 PM";
    @track message = "Good Afternoon";
    verticalAlign = "slds-grid_vertical-align-center";

    @track todos = [];

    connectedCallback(){
        this.getTime();

        setInterval(() => {
            this.getTime();
        },1000*60); 
    }

    getTime(){
        const d = new Date();
        const hours = d.getHours();
        const minutes = d.getMinutes();

        this.time = `${this.getHours(hours)}:${this.getMinutes(minutes)} ${this.getTimeMerridean(hours)} `;

        this.getGreetingMessage(hours);
    }

    getHours(hours){
        return hours == 0 ? 12 : hours > 12 ? hours - 12 : hours ;
    }

    getMinutes(digit){
        return digit < 10 ? "0"+digit : digit ;
    }

    getTimeMerridean(hours){
        return hours >= 12 ? "PM" : "AM";
    }

    getGreetingMessage(hours){
        if(hours < 12){ this.message = "Good Morning !"; }
        else if(hours >=12 && hours < 17) { this.message = "Good Afternoon !"; }
        else { this.message = "Good Night !"; }
    }

    addItemHandler(){
        const input_item = this.template.querySelector("lightning-input");

        const todo = {
            todoId: this.todos.length,
            todoName: input_item.value
        }

        this.todos.push(todo);
        input_item.value ="";
    }
}