import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
mutation ($email: String!, $password: String!) {
  login (email: $email, password: $password) {
    id
    username
    email
    tokens {
      id
      device
      tokenHash
    }
  }
}
`

export const CHECK_TOKEN = gql`
{
  check {
    id
    username
    email
  }
}
`

export const SIGNUP_MUTATION = gql`
mutation($email: String!, $username: String!, $password: String!) {
  signup(email: $email, password: $password, username: $username) {
    id
    email
    username
    tokens {
      id
      device
      tokenHash
    }
  }
}
`

export const GET_POSTS = gql`
{
  posts {
    id
    subject
    description
    createAt
    commentCount
    creator {
      id
      username
      email
    }
    comments {
      id
      message
      createAt
      commentor {
        id
        username
        email
      }
    }
  }
}
`

export const NEW_POST = gql`
mutation ($subject: String!, $description: String) {
  newPost (subject: $subject, description: $description) {
    id
    subject
    description
    creator {
      id
      email
      username
    }
    createAt
    commentCount
    comments {
      id
      message
      createAt
      commentor {
        id
        email
        username
      }
    }
  }
}
`