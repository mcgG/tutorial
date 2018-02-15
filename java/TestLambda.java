import java.util.function.Function;

public class TestLambda {

    public static void execute(Runnable runnable) {
        runnable.run();
    }

    public static void main(String[] args) {
        execute(() -> System.out.println("run"));
        System.out.println(applyExam(1234));
    }

    public static int applyExam(int value) {
        Function<Integer, String> convert = (i) -> Integer.toString(i);
        return convert.apply(value).length();
    }


}
