import java.io.*;
public class EmployeeTest {
    public static void main(String []args){
        Employee empOne = new Employee("one");
        Employee empTwo = new Employee("two");
        
        empOne.empAge(26);
        empOne.empDesignation("高级程序员");
        empOne.empSalary(50000);
        empOne.printEmployee();
        
        empTwo.empAge(22);
        empTwo.empDesignation("菜鸟程序员");
        empTwo.empSalary(5000);
        empTwo.printEmployee();
        
        int x = 10;
        while(x < 20){
            System.out.println("value of x:"+x);
            x++;
        }
        
        for(int y=0;y<10;y++){
            if(y == 5){
                break;
            }
            System.out.print("value of y:"+y+"\n");
            System.out.print("random:"+Math.random()+"\n");
        }
    }
}

