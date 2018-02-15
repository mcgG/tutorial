import java.util.ArrayList;
import java.util.List;

class Generic<T> {
    private T key;
    public Generic(T key) {
        this.key = key;
    }
    public T getKey() {
        return this.key;
    }
}

public class GenericMethodTest {
    public static <E> void printArray(E[] inputArray) {
        for (E element : inputArray) {
            System.out.printf("%s ", element);
        }
        System.out.println();
    }

    public static void showKeyValue(Generic<?> obj) {
        System.out.println("Key value is " + obj.getKey());
    }

    public static void main(String[] args) {
        Integer[] intArray = {1,2,3,4,5};
        Double[] doubleArray = {1.1, 2.2, 3.3, 4.4};
        Character[] charArray = {'H', 'E', 'L', 'L', 'O'};

        //System.out.println("Integer array");
        //printArray(intArray);

        //System.out.println("Integer array");
        //printArray(doubleArray);

        //System.out.println("Integer array");
        //printArray(charArray);

        //List arrayList = new ArrayList();
        //arrayList.add("aaaa");
        //arrayList.add(100);

        //for (int i=0; i<arrayList.size(); i++) {
        //    //String item = (String)arrayList.get(i);
        //    System.out.println((String)1);
        //}

        Generic<Integer> gInt = new Generic<Integer>(123);
        Generic<Number> gNum = new Generic<Number>(123);
        showKeyValue(gNum);
        showKeyValue(gInt);
    }
}
