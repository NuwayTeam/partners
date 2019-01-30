import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { createAssignment } from '../graphql/mutations'
import { Header, Form, Button, Divider, Icon, Segment } from 'semantic-ui-react'
import {isValid} from '../Helpers'

export default class NewAssignment extends Component {

  constructor(props) {
    super(props);

    const DEFAULT_STATE = { name: '', role: '', contact: '', location: '', description: '' }
    this.state = {
      ...DEFAULT_STATE,
      saving: false,
      showForm: false
    }
   }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  createAssignment = async () => {
    this.setState({ saving: true });

    try {
      const {name, role, location, contact, description} = this.state
      this.setState(this.DEFAULT_STATE)
      await API.graphql(graphqlOperation(createAssignment, {input: {name, role, location, contact, description}}))
      console.log('assignment successfully created!')
    } catch (err) {
      console.log('error: ', err)
    }

    this.setState({ saving: false });
  }

  render() {
    return (
      <Segment inverted className='NewAssignment'>
        <Header as='h3'>
          Lägg till ett nytt uppdrag
        </Header>
        <p>{this.props.count} aktiva uppdrag.</p>
        <Divider />
        {this.state.showForm ?
          <Form inverted>
            <Form.Input fluid label='Namn' placeholder='Namn' name='name' value={this.state.name} onChange={this.onChange}/>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Roll' placeholder='Roll' name='role' value={this.state.role} onChange={this.onChange}/>
              <Form.Input fluid label='Placering' placeholder='Placeringsort' name='location' value={this.state.location} onChange={this.onChange}/>
            </Form.Group>
              <Form.Input fluid label='Kontakt' placeholder='Emailadress till kontaktperson' name='contact' value={this.state.contact} onChange={this.onChange}/>
            <Form.TextArea label='Beskrivning' placeholder='Uppdragsbeskrivning' name='description' value={this.state.description} onChange={this.onChange}/>
            <Form.Group widths='equal'>
              <Form.Button fluid loading={this.state.saving} primary disabled={!isValid(this.state)} onClick={this.createAssignment}>Spara</Form.Button>
              <Form.Button fluid onClick={this.toggleForm}>Stäng</Form.Button>
            </Form.Group>
          </Form> :
          <Button animated='fade' primary onClick={this.toggleForm}>
            <Button.Content visible>Nytt uppdrag</Button.Content>
            <Button.Content hidden>
              <Icon name='edit outline' />
            </Button.Content>
          </Button>
        }
      </Segment>
      )
   }
}