import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Dimmer, Loader, Container, Item, Label, Button } from 'semantic-ui-react'
import EventCard from '../../components/EventCard';
import InnerHtml from '../../components/InnerHtml';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

const htmlStyles = {
  marginTop: '3rem',
  marginBottom: '3rem'
}

const controlStyles = {
  display: 'flex',
  justifyContent: 'space-between'
}

const Event = ({
  isLoading,
  event,
  isAuthenticated,
  handleEdit,
  isEditing,
}) => (
    <div>
      {isLoading &&
        <Container>
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        </Container>
      }
      {!isLoading &&
        <Item.Group divided>
          <EventCard
            id={event.id}
            title={event.name}
            uri={event.uri}
            logoUri={event.logo_uri}
            organizer={event.organizer && event.organizer.name}
            category={event.category && event.category.name}
            startTime={event.start_time}
            endTime={event.finish_time}
            minPrice={event.min_ticket_price}
            maxPrice={event.max_ticket_price}
            currency={event.ticket_price_currency}
          />

          <div style={controlStyles}>
            {
              get(event, 'provider_specific_data.ticket_availability.is_sold_out') &&
              <Label as='a' color='red' tag>
                Sold out
            </Label>
            }
            {
              get(event, 'provider_specific_data.ticket_availability.has_available_tickets') &&
              <Button as='div' color='green' labelPosition='left'>
                <Label as='a' href={event.uri} basic pointing='right' color='green'>
                  Tickets available
              </Label>
                <Button color='green' as='a' href={event.uri}>
                  Go to website
              </Button>
              </Button>
            }
          </div>
          <InnerHtml html={event.description_html} styles={htmlStyles} />
        </Item.Group>
      }
    </div>
  );

@withRouter
@inject('EventStore')
@observer
class EventContainer extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.EventStore.getEvent(params.id);
  }

  render() {
    const {
      currentEvent,
      isLoading,
    } = this.props.EventStore

    return (
      <Event
        event={currentEvent}
        isLoading={isLoading}
      />
    )
  }
}

export default EventContainer;