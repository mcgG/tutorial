class Student implements Cloneable {

    private int id;
    private String name;
    private int age;

    public Student(int id, String name, int age) {
        super();
        this.id = id;
        this.name = name;
        this.age = age;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class CloneTest {

    public static void main(String[] args) throws CloneNotSupportedException {
        Student s1 = new Student(0, "Ben", 20);
        Student s2 = s1;
        Student s3 = new Student(1, "Christin", 22);
        Student s4 = (Student)s3.clone();

        System.out.println("s1 = " + s1);
        System.out.println("s2 = " + s2);
        System.out.println("s3 = " + s3);
        System.out.println("s4 = " + s4);
    }

}
