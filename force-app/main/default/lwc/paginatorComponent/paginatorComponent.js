import { LightningElement, api } from 'lwc';

export default class PaginatorComponent extends LightningElement {
    @api totalRecords;
    @api pageSize;
    @api pageNo;
    @api totalPages
    show;

    previousHandler(){
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler(){
        this.dispatchEvent(new CustomEvent('next'));
    }

    get disablePrevious(){
        return this.pageNo <= 1;
    }

    get disableNext(){ 
        return this.pageNo >= this.totalPages;
    }
}