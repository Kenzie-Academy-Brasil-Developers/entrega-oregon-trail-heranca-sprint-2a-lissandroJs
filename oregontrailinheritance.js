class Traveler {
    constructor(nome, food = 1,isHealthy =true) {
        this._nome = nome
        this._food = food
        this._isHealthy = isHealthy
    }
    get isHealthy() {
        return this._isHealthy
    }
    set isHealthy(live) {
        this._isHealthy = live
    }
    get food() {
        return this._food
    }
    set food(f) {
        this._food = f
    }

    hunt() {
        this.food += 2
    }

    eat() {
        if (this.food > 0) {
            this.food -= 1
            this.isHealthy = true
        } else {
            this.isHealthy = false
        }

    }
}

class Wagon {
    constructor(capacity, passengers = []) {
        this._capacity = capacity
        this._passengers = passengers
    }

    get capacity(){
        return this._capacity
    }
    set capacity(valor){
        this._capacity = valor
    }

    getAvailableSeatCount() {
        let capacidade = this._capacity
        let pessoas = this._passengers.length
        let disponivel = capacidade - pessoas
        if (disponivel >= 0) {
            return disponivel
        } else {
            return 0
        }

    }

    join(name) {
        if(this.getAvailableSeatCount() == 0){
            return "Nao temos espaco"
        }else{
            this._passengers.push(name)
        }
        
    }

    shouldQuarantine() {
        let passagueiros = this._passengers
        let quarentena = false
        for (let i = 0; i < passagueiros.length; i++) {
            if (passagueiros[i].isHealthy == false) {
                quarentena = true
            }
        }
        return quarentena
    }
    totalFood(){
        let store = 0
        let passagueiros = this._passengers
        for(let i = 0 ; i< passagueiros.length;i++){
            store +=passagueiros[i].food
        }
        return store
    }

}

class Hunter extends Traveler{
    constructor(name,food = 2,isHealthy){
        super(name,food,isHealthy)

    }
    hunt(){
        this.food+=5
    }
    eat(){
        if(this.food>= 2){
            this.food -=2
            this.isHealthy = true
        }else{
            this.food -= 1
            this.isHealthy = false
        }
    }

    giveFood(traveler,numOfFood){
        
        if(this.food > numOfFood){
            this.food -= numOfFood
            traveler.food += numOfFood
        }else{
            return "Faltou os mantimentos, bora caçar"
        }
    }

}


class Doctor extends Traveler{
    constructor(name,food,isHealthy){
        super(name,food,isHealthy)

        
    }
    heal(traveler){
        if(traveler.isHealthy == false){
            traveler.isHealthy = true
        }
    }
}

// TESTE

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter); 

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);