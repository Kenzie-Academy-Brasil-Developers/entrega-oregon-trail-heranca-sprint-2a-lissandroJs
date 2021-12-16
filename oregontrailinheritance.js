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
