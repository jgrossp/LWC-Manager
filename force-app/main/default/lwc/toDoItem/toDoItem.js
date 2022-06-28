import { LightningElement, api } from 'lwc';

export default class TodoItem extends LightningElement {

    @api todoId;
    @api todoName;
    @api done = false;


    get containerClass() { 
        return this.done? "Tâche terminée" : "Voyons ce que nous avons"; 
    }
}