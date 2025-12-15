import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Button } from "@taroify/core";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index flex justify-center items-center bg-red-400">
      <Text>Hello world!</Text>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </View>
  );
}
