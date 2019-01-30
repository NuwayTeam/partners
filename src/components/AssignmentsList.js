import React, { Component } from 'react';
import { Header, List, Segment } from 'semantic-ui-react';

export default class AssignmentsList extends Component {

  buildEmailLink(email) {
    return `mailto:${email}`;
  };

  items() {
    return this.props.assignments.sort(this.sort('name')).map(item =>
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
                <a href={this.buildEmailLink(item.contact)}>{item.contact}</a>
              </List.Content>
            </List.Item>
          </List>
        </List.Content>
      </List.Item>);
    }

  sort(key, order='asc') {
    return (a, b) => {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0; 
  
      const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (aVal > bVal) comparison = 1;
      if (aVal < bVal) comparison = -1;
  
      return order === 'desc' ? (comparison * -1) : comparison
    };
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>Uppdrag</Header>
        <List divided relaxed>
          {this.items()}
        </List>
      </Segment>
    );
  }
}