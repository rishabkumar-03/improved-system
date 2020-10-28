import { LightningElement } from 'lwc';

export default class LwcUsecase2Comp extends LightningElement {
    products = [
        {
            'id': 1,
            'qty':10,
            'name':'Skittles'
        },
        {
            'id': 2,
            'qty':20,
            'name':'LaffyTaffy'
        },
        {
            'id': 3,
            'qty':40,
            'name':'M&M'
        },
    ]
}