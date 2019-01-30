// eslint-disable
// this is an auto generated file. This will be overwritten

export const getAssignment = `query GetAssignment($id: ID!) {
  getAssignment(id: $id) {
    id
    name
    description
    open
    city
    role
  }
}
`;
export const listAssignments = `query ListAssignments(
  $filter: ModelAssignmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      open
      city
      role
    }
    nextToken
  }
}
`;
