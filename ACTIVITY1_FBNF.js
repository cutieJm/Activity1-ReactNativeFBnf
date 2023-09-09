import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Post = ({ name, message, image, onReact, onComment, likes, comments }) => {
  const [commentInput, setCommentInput] = useState('');

  return (
    <View style={styles.post}>
      <View style={styles.userInfo}>
        <Image source={{ uri: image }} style={styles.userImage} />
        <Text style={styles.userName}>{name}</Text>
      </View>
      <Text style={styles.postMessage}>{message}</Text>
      <Image source={{ uri: image }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity onPress={onReact}>
          <Text>React</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment}>
          <Text>Comment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.likesComments}>
        <Text>{likes} Likes</Text>
        <Text>{comments.length} Comments</Text>
      </View>

      {comments.map((comment, index) => (
        <Text key={index} style={styles.comment}>{comment}</Text>
      ))}

      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
        value={commentInput}
        onChangeText={text => setCommentInput(text)}
      />
      <TouchableOpacity onPress={() => onComment(commentInput)}>
        <Text>Post Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [posts, setPosts] = useState([
    {
      name: "Jiraiya Sensei",
      message: "annyeong everything!",
      image: "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/11/16/332305973.jpg",
      likes: 11,
      comments: []
    },
    {
      name: "Upin & Ipin",
      message: "Can we be friends?",
      image: "https://static.tvtropes.org/pmwiki/pub/images/tumblr_lz990l4wFa1r29mrb_4252.jpg",
      likes: 0,
      comments: []
    },
    {
      name: "Beerus",
      message: "I'm your king.",
      image: "https://i.pinimg.com/236x/46/17/31/4617317bec7954f4bb02489d035f6a71.jpg",
      likes: 0,
      comments: []
    },
  ]);

  const handleReact = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const handleComment = (index, comment) => {
    const updatedPosts = [...posts];
    updatedPosts[index].comments.push(comment);
    setPosts(updatedPosts);
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <Post
          key={index}
          {...post}
          onReact={() => handleReact(index)}
          onComment={(comment) => handleComment(index, comment)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postMessage: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  likesComments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  comment: {
    marginBottom: 5,
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
});

export default App;
