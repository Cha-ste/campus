package ocean.jpaDemo.entity;

public class Person {
    @TestAnnotation(levle = 10)
    private String firstName;
    @TestAnnotation(required = true)
    private String lastName;

    @TestAnnotation(required = true, name = "firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
