import { useState } from "react";
import { View } from "react-native";
import { Menu, Button } from "react-native-paper";
import { SortType } from "../config/types";

const SortRepositories = ({ setSort }: SortRepositoryProps) => {
  const [visible, setVisible] = useState(false);

  const select = (sortType: SortType) => {
    setSort(sortType);
    setVisible(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button onPress={() => setVisible(true)}>Show menu</Button>}
      >
        <Menu.Item onPress={() => select(SortType.LATEST)} title={SortType.LATEST} />
        <Menu.Item onPress={() => select(SortType.HIGHEST)} title={SortType.HIGHEST} />
        <Menu.Item onPress={() => select(SortType.LOWEST)} title={SortType.LOWEST} />
      </Menu>
    </View>
  );
};

interface SortRepositoryProps {
  setSort: React.Dispatch<React.SetStateAction<SortType>>;
}

export default SortRepositories;
