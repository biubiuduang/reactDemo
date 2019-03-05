/**
 * 当数据类型不一样的时，将会发生数据类型转换。
 *
 * 自动类型转换（隐式）
 *      1。特点：代码不需要进行特殊处理，自动完成
 *      2。规则：数据范围从小到大
 *
 *  强制类型转换（显式）
 *      1。特点：代码需要进行特殊大格式处理，不能自动完成
 *      2。格式：范围小的类型 范围小的变量名 = （范围小的类型）原本范围大的数据；
 *
 *  注意事项：
 *      1。强制类型转换一般不推荐使用，因为有可能发生精度损失、数据溢出。
 *      2。byte/short/char 这三种类型都可以发生数学运算， 例如加法"+"。
 *      3. byte/short/char 这三种类型在运算的时候，都会被提成成为int类型，然后再计算。
 *      4. boolean 类型不能发生数据类型转换
 * */

public class Demo01DataType{
    public static void main(String[] args){
        /**自动类型转换**/
        System.out.println(1024);
        System.out.println(3.14);

        //int => long
        long num1 = 100;
        System.out.println(num1);

        //float => double
        double num2 = 2.5F;
        System.out.println(num2);

        //long => float
        float num3 = 30L;
        System.out.println(num3);

        /**强制类型转换**/

        //long => int
        int num4 = (int)100L;
        System.out.println(num4);

        //数据溢出 int最大 21,0000,0000
        int num5 = (int)6000000000L;
        System.out.println(num5); //1705032704

        //double => int
        //精度损失
        int num6 = (int)3.14;
        System.out.println(num6); //3

        char zifu1 = 'A';
        System.out.println(zifu1+1);

        byte num7 = 40;
        byte num8 = 50;
        //byte + byte --> int + int -->int
        int result1 = num7+num8;
        System.out.println(result1);

        short num9 = 60;
        //byte + short --> int + int --> int
        int result2 = num7 + num9;
        System.out.println(result2);
        short result3 = (short)(num7+num9);
        System.out.println(result3);

    }
}