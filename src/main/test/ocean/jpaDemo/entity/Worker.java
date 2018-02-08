package ocean.jpaDemo.entity;

import javax.xml.ws.soap.Addressing;

public class Worker extends Person{
    private Double salary;

    @Addressing
    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
