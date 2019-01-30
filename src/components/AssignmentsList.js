import React, { Component } from 'react'
import { Header, List, Segment } from 'semantic-ui-react'
import {buildEmailLink, sortList} from '../Helpers'

export default class AssignmentsList extends Component {

  items() {
    if (!this.props.assignments) {
      return (<span>Det finns inga aktuella uppdrag, kom tillbaka senare.</span>)
    }
    return this.props.assignments.sort(sortList('name')).map(item =>
      <List.Item key={item.id}>
        <List.Content>
          <List.Header as='a'>{item.name}</List.Header>
          <List.Description>{item.description}</List.Description>
          <List divided>  
            <List.Item>
              <List.Icon name='users' />
              <List.Content>{item.role}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{item.location}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href={buildEmailLink(item.contact)}>{item.contact}</a>
              </List.Content>
            </List.Item>
          </List>
        </List.Content>
      </List.Item>);
    }

  render() {
    return (
      <Segment className="AssignmentList">
        <Header as='h3'>Uppdrag</Header>
        <List divided relaxed>
          {this.items()}
        </List>
      </Segment>
    );
  }
}