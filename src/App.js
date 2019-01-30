import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import './App.css'

import { API, graphqlOperation } from 'aws-amplify'
import { listAssignments } from './graphql/queries'
import { onCreateAssignment } from './graphql/subscriptions'

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react'

import AssignmentsList from './components/AssignmentsList'
import NewAssignment from './components/NewAssignment'

Amplify.configure(aws_exports);

class App extends Component {
  state = { assignments: [] }

  async componentDidMount() {
    try {
      const apiData = await API.graphql(graphqlOperation(listAssignments))
      const assignments = apiData.data.listAssignments.items
      this.setState({ assignments })
    } catch (err) {
      console.log('error: ', err)
    }

    this.subscription = API.graphql(
      graphqlOperation(onCreateAssignment)
    ).subscribe({
      next: assignmentData => {
        const assignment = assignmentData.value.data.onCreateAssignment
        const assignments = [
          ...this.state.assignments.filter(a => {
            return (
              a.name !== assignment.name && 
              a.role !== assignment.role && 
              a.location !== assignment.location && 
              a.contact !== assignment.contact && 
              a.description !== assignment.description
            )
          }),
          assignment
        ]
        this.setState({ assignments })
      }
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    return (
      <div className="App">
        <Header as='h1'>Nuway partnerportal</Header>
        <Grid centered padded>
          <Grid.Column mobile={16} computer={6}>
            <NewAssignment count={this.state.assignments.length}/>
            <AssignmentsList assignments={this.state.assignments} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withAuthenticator(App, {includeGreetings: true});