/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { gql } from "@apollo/client";

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      username
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ gql`
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
