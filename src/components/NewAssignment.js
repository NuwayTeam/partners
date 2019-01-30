import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { createAssignment } from '../graphql/mutations'
import { Header, Form, Segment } from 'semantic-ui-react'

export default class NewAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      role: '',
      location: '',
      contact: ''
     };
   }

  isValid = () => {
    const { name, role, contact, location } = this.state
    return !(name === '' || role === '' || contact === '' || location === '')
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createAssignment = async () => {
    const { name, role, contact, location, description } = this.state
    try {
      const assignment = { name, role, contact, location, description }
      this.setState({ name: '', role: '', contact: '', location: '', description: '' })
      await API.graphql(graphqlOperation(createAssignment, {input: assignment}))
      console.log('assignment successfully created!')
    } catch (err) {
      console.log('error: ', err)
    }
  }

  render() {
    return (
      <Segment inverted>
        <Header as='h3'>Lägg till ett nytt uppdrag</Header>
        <Form inverted>
        <Form.Input fluid label='Namn' placeholder='Namn' name='name' value={this.state.name} onChange={this.onChange}/>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Roll' placeholder='Roll' name='role' value={this.state.role} onChange={this.onChange}/>
          <Form.Input fluid label='Placering' placeholder='Placerings ort' name='location' value={this.state.location} onChange={this.onChange}/>
        </Form.Group>
          <Form.Input fluid label='Kontakt' placeholder='Emailadress till kontaktperson' name='contact' value={this.state.contact} onChange={this.onChange}/>
        <Form.TextArea label='Beskrivning' placeholder='Uppdragsbeskrivning' name='description' value={this.state.description} onChange={this.onChange}/>
        <Form.Button primary disabled={!this.isValid()} onClick={this.createAssignment}>
          Spara
        </Form.Button>
      </Form>
      </Segment>
      )
   }
}