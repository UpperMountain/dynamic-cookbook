import React from "react";
import { Platform, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-renderer";

interface Props {
  children: string;
}

const styles = StyleSheet.create({
  listUnorderedItemIcon: {
    fontSize: 48,
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        lineHeight: 43
      },
      android: {
        lineHeight: 48
      }
    })
  }
});

export default function MD(props: Props) {
  return <Markdown style={styles}>{props.children}</Markdown>;
}
