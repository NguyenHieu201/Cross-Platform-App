import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import LikeButton from "./LikeButton";
import { fileApi } from "../../api/fileApi";

const defaultAvatar = require("../../assets/user.png");

const Post = ({ post }) => {
  return (
    <View
      style={{
        padding: 5,
        borderTopColor: "#05050538",
        borderTopWidth: 1,
        marginTop: 10,
      }}
    >
      <PostHeader post={post} />
      <PostCaption post={post} />
      <PostImage post={post} />
      <PostLikes post={post} />
      <PostReacts post={post} />
      {/* <PostComments post={post} /> */}
      <CommentFooter />
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: post.profile_img }}
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          borderColor: "#166ada",
          borderWidth: 2.5,
        }}
      />
      <View>
        <Text>
          {"  "}
          {post.author.username}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>
            {"  "}
            {post.createdAt}
          </Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/44/44386.png",
            }}
            style={{
              width: 12,
              height: 12,
              marginLeft: 5,
            }}
          />
        </View>
      </View>
    </View>

    <View>
      <Text style={{ fontWeight: "900" }}>...</Text>
    </View>
  </View>
);

const PostCaption = ({ post }) => (
  <View>
    <Text style={{ paddingHorizontal: 10 }}>{post.described}</Text>
  </View>
);

const PostImage = ({ post }) => {
  const images = post.images;
  const numImage = images.length;
  if (numImage > 0)
    return (
      <View
        style={{
          width: "100%",
          height: 400,
          paddingTop: 5,
        }}
      >
        {numImage > 0 &&
          images.map((image, index) => {
            return (
              <Image
                key={index}
                source={{ uri: fileApi({ filename: image.fileName }) }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            );
          })}
      </View>
    );
};

const PostLikes = ({ post }) => (
  <View
    style={{
      paddingTop: 5,
      flexDirection: "row",
    }}
  >
    <Icon name="thumbs-up" type="font-awesome" />
    <Text>
      {"  "}
      {post.like.length}
    </Text>
  </View>
);

const PostReacts = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Likes */}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 100,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 5,
      }}
    >
      <TouchableOpacity>
        <LikeButton isLiked={post.isLike} />
      </TouchableOpacity>
      <Text>
        {"  "}
        {post.likes}
      </Text>
    </View>
    {/* comments */}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 100,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#F0F2F5",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 5,
      }}
    >
      <TouchableOpacity>
        <Icon name="comment" type="font-awesome" />
      </TouchableOpacity>
      <Text>
        {"  "}
        {post.countComments}
      </Text>
    </View>
    {/* share */}
  </View>
);

const PostComments = ({ post }) => (
  <View>
    {post.comments.map((comment, index) => (
      <View
        key={index}
        style={{
          flexDirection: "row",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: comment.profile_img }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            marginRight: 5,
          }}
        />
        <View
          style={{
            backgroundColor: "#F0F2F5",
            borderRadius: 25,
            minWidth: 100,
            height: 50,
            paddingHorizontal: 15,
            justifyContent: "center",
          }}
        >
          <Text>{comment.name}</Text>
          <Text>{comment.comment}</Text>
        </View>
      </View>
    ))}
  </View>
);

const CommentFooter = () => (
  <View
    style={{
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Image
      source={{
        uri: "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-1/cp0/c0.0.40.40a/p40x40/261146077_422992066116659_6682694448204413388_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=dbb9e7&_nc_eui2=AeH-9Ntkhzj_3MC3euuSCzBTH2s9G3JX8pgfaz0bclfymLGAAiMZDlmfevB3vX0nLkpVWAy6HvOnw9h6Ef0iLZNT&_nc_ohc=DJUyvMXHyuEAX8OfGU5&_nc_ht=scontent.fdac99-1.fna&oh=16d22fa55ea0bff35c17e06ce71e8aec&oe=61AE6BFA",
      }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 50,
      }}
    />
    <TextInput
      placeholder="Write your comment..."
      style={{
        marginLeft: 10,
        borderColor: "#f0f2f5",
        height: 40,
        borderWidth: 1,
        width: "85%",
        paddingLeft: 10,
        position: "relative",
        borderRadius: 30,
      }}
    />
    <Image
      source={{
        uri: "https://cdn-icons-png.flaticon.com/512/1829/1829415.png",
      }}
      style={{
        position: "absolute",
        right: 20,
        top: 12,
        width: 25,
        height: 25,
        opacity: 0.7,
      }}
    />
  </View>
);

export default Post;
