public class Demo02DataTypeChar{
    public static void main(String[] args){
        char zifu1 = '1';
        System.out.println(zifu1+0);

        char zifu2 = 'A';

        char zifu3 = 'c';
        // char -> int 确实是从小到大 发生了数据类型转换
        int num = zifu3;
        System.out.println(num);

        char zifu4 = '中';
        System.out.println(zifu4+0);

        method(999);
        getData();
        forData();
        control();
    }
    public static void method(int a) {
        System.out.println(a);
    }

    public static void getData(){
        int i = 0;
        i = (1 > 3 ? 100 : 200);
        System.out.println(i);

        int j = 0;

        System.out.println(j > 0 ? true : false);

    }
    public static void forData(){
        int i;
        for(i = 0;i < 10; i++){
            if(i == 4){
                continue;
            }
            System.out.println(i);
        }
        System.out.println("i:"+i);
    }

    public static void control(){
        int a = 10,b = 20;
        if(a == b){
            System.out.println("a等于b");
        }else{
            System.out.println("a不等于b");
        }

        int day = 6;
        switch (day){
            case 1:
                System.out.println("星期一");
                break;
            case 2:
                System.out.println("星期二");
                break;
            case 3:
                System.out.println("星期三");
                break;
            case 4:
                System.out.println("星期四");
                break;
            case 5:
                System.out.println("星期五");
                break;
            case 6:
                System.out.println("星期六");
                break;
            default:
                System.out.println("星期日");
        }

        int c = 6;
        while(c < 10){
            System.out.println(c);
            c++;
        }
    }
}

