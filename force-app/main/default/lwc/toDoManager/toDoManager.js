import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/ToDoController.addTodo";

export default class ToDoManager extends LightningElement {
    @track time = "22:15 PM";
    @track greeting = "Bonsoir";

    @track todos= [];

    connectedCallback() {
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000);
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`;

        this.setGreeting(hour);
    }
    
    getHour(hour){
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }
    
    getMidDay(hour){
        return hour >= 12 ? "PM" : "AM";
    }

    getDoubleDigit(digit){
        return digit < 10 ? "0" + digit : digit;
    }

    setGreeting(hour){
        if(hour < 12){
            this.greeting = "Bonjour";
        }
        else if(hour >= 12 && hour < 17){
            this.greeting = "Bon après-midi";
        }else{
            this.greeting = "Bonsoir";
        }
    } 
    
    addTodoHandler(){
        const inputBox = this.template.querySelector("lightning-input");

        const todo = {            
            todoName: inputBox.value,
            done: false,
        }

        addTodo({payloar:JSON.stringify(todo)}).then(response => {
            console.log('Item inserted successfully');
        }).catch(error => {
            console.error('Error in inserting todo item ' + error);
        });
        //this.todos.push(todo);
        inputBox.value = "";
    }

    get upcomingTasks(){
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => !todo.done) 
        :[]; 
    }
    get completeTasks(){
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => todo.done) 
        :[]; 
    }
}