import React from "react";
import {
  StyleSheet,
  View,
  ViewProps,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { Asset } from "expo";

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row"
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden"
  },
  image: {
    width: 50,
    height: 50
  },
  body: {
    flex: 1,
    marginLeft: 15
  },
  bodyText: {
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default function ListItem({
  name,
  body,
  children,
  image,
  onPress,
  style
}: {
  name: string;
  body?: string;
  image?: Asset;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewProps["style"];
}) {
  const contents = (
    <>
      <View style={styles.imageContainer}>
        {image && <Image style={styles.image} source={image} />}
      </View>
      <View style={styles.body}>
        <View style={styles.bodyText}>
          <Text numberOfLines={1}>{name}</Text>
          {body && (
            <Text numberOfLines={1} style={{ color: "rgba(0,0,0,0.55)" }}>
              {body}
            </Text>
          )}
        </View>
        {children}
      </View>
    </>
  );

  // add touch handler only if enabled
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        {contents}
      </TouchableOpacity>
    );
  } else {
    return <View style={[styles.item, style]}>{contents}</View>;
  }
}
