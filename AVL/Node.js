module.exports = class Node { 
    constructor(value){
        this.data = value 
        this.left = null 
        this.right = null 
        this.parent = null 
        this.balance = null 
        this.level = null 
    }
}