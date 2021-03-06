package ocean.other;

import org.junit.Test;

import java.math.BigDecimal;

public class NumberTransfer {

    /**
     * 科学计数转换成字符串
     */
    @Test
    public void kxToString() {
        String num = "1.2E10";

        int index = num.lastIndexOf('E');
        String times = num.substring(index + 1, num.length());
        String preNum = num.substring(0, index);

        System.out.println("times: " + times);
        System.out.println("preNum: " + preNum);
        Double result = Math.pow(10, Double.valueOf(times)) * Double.valueOf(preNum);
        System.out.println("get: " + result);
        String aim = String.valueOf("translate: " + result);
        System.out.println(aim);

        double look = 13200000000000D;
        //损失精度
        System.out.println("look: " + look);
        System.out.println(new BigDecimal(look).setScale(0).toString());

        System.out.println(2<<4);

    }

    @Test
    public void testRounding(){
        BigDecimal bigDecimal = new BigDecimal("2.55".toString()).setScale(0,BigDecimal.ROUND_HALF_EVEN);
        System.out.println(bigDecimal);

//        System.out.println(Double.valueOf("月"));
    }

}
