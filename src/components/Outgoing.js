import React, { useState, useEffect } from "react";
import axiosWithAuth from "./utils/axiosWithAuth";
import { Table } from "semantic-ui-react";

const Outgoing = (props) => {
  // props provides objects by default
  const postId = props.match.params.postId;
  console.log(postId)
  console.log(props)

  const [messages, setMessages] = useState([]);
  const [post, setPost] = useState({});

  const getMessages = () => {
    axiosWithAuth()
      .get(
        "https://strangers-things.herokuapp.com/api/2007-UNF-RM-WEB-PT/posts"
      )
      .then((response) => {
        const posts = response.data.data.posts;
        const filteredPost = posts.filter((post) => post._id.includes(postId));
        console.log(filteredPost[0]);
        setMessages(filteredPost[0].messages);
        setPost(filteredPost[0]);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);
  console.log("props", postId);
  return (
    <div>
      {post ? <div className="flexbox-column"><h1 className="top-page-spacing">{post.title}</h1><div className="flexbox-column"><p>Price: {post.price}</p><p>Location: {post.location}</p></div></div> : null}
      {messages.length > 0 ? (
        <Table celled className="centered-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Message</Table.HeaderCell>
              <Table.HeaderCell>Sender</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {messages.length > 0 ? messages.map((message) => 
                  <Table.Row>
                    <Table.Cell>{message.content}</Table.Cell>
            <Table.Cell>{message.fromUser.username}</Table.Cell>
                  </Table.Row>
                )
              : null}
          </Table.Body>
        </Table>
      ) : (
        <Table celled className="centered-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Message</Table.HeaderCell>
              <Table.HeaderCell>Sender</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
                  <Table.Row>
                    <Table.Cell>No messages</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
                  </Table.Row>
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default Outgoing;

