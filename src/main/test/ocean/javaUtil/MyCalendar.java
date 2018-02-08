package ocean.javaUtil;

import org.junit.Test;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Ocean on 2017/10/29.
 */
public class MyCalendar {

    @Test
    public void setMinAndMaxTimeOfMonth(){
        Calendar calendar = Calendar.getInstance();
        for (int month = 0; month < 12; month++) {
            calendar.set(Calendar.MONTH, month);
            calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DATE));
            calendar.set(Calendar.HOUR_OF_DAY, calendar.getActualMinimum(Calendar.HOUR_OF_DAY));
            calendar.set(Calendar.MINUTE, calendar.getActualMinimum(Calendar.MINUTE));
            calendar.set(Calendar.SECOND, calendar.getActualMinimum(Calendar.SECOND));
            Date begin = calendar.getTime();
            System.out.println("begin:" + begin);
            calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
            calendar.set(Calendar.HOUR_OF_DAY, calendar.getActualMaximum(Calendar.HOUR_OF_DAY));
            calendar.set(Calendar.MINUTE, calendar.getActualMaximum(Calendar.MINUTE));
            calendar.set(Calendar.SECOND, calendar.getActualMaximum(Calendar.SECOND));
            Date end = calendar.getTime();
            System.out.println("end" + end);
        }
    }
}
