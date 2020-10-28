import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    cities = [{
      Id: 'c1',
      name: 'Chennai'
    },
    {
      Id: 'c2',
      name: 'Bangalore'
    },
    {
      Id: 'c3',
      name: 'Pune'
    }];
    areDetailsVisible = false;
    greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }

  handlecheckbox(event){
    this.areDetailsVisible = event.target.checked;
  }
}