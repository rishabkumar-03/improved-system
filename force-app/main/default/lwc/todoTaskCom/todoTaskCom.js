import { LightningElement, api } from 'lwc';

export default class TodoTaskCom extends LightningElement {
    @api todoId;
    @api todoName;

}