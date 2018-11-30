import Person,{ a,b,add } from './export.js'

console.log(a,b,add(a,b));
var p = new Person('Tom','30');
p.say();
Person.isHumen();

console.log(Person.prototype);
console.log(p instanceof Person);
console.log(p.constructor === Person);

class Corder extends Person{
    constructor(name,age){
        super(name,age);
    }
    code(){
        console.log("我会写代码。。。。");
    }
}

var c = new Corder();
c.name = 'Joy';
c.age = 29;

c.say();
c.code();

console.log(Corder.isHumen());

console.log(this); //undefined

console.log(new Corder());