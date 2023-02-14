import React, { useState } from "react";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LikeButton = ({ isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  return (
    <Pressable
      onPress={() => {
        setLiked((isLiked) => !isLiked);
      }}
    >
      <AntDesign
        name={liked ? "like1" : "like2"}
        size={32}
        color={liked ? "black" : "black"}
      />
    </Pressable>
  );
};

export default LikeButton;
