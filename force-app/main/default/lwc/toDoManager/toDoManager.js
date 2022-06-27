import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    time = "22:15 PM";
    greeting = "Bonsoir";

    connectedCallback() {
        this.getTime();
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
}