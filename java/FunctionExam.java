import java.util.Arrays;
import java.util.function.Function;

public class FunctionExam {
    public static int applyExam(int value) {
        Function<Integer, String> converter = (i) -> Integer.toString(i);
        return converter.apply(value).length();
    }

}
