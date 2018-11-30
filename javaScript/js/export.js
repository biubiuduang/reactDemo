var a = 1;
var b = 2;
function add(a,b){
    return a + b
}

export {a,b,add}

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    static isHumen(){
        console.log("我是一个静态方法");
    }
    say(){
        console.log(`${this.name} 说 他的年龄说：${this.age} 岁`);
    }
}


export default Person;