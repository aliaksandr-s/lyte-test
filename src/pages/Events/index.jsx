import React, { Component } from 'react';
import EventCard from '../../components/EventCard';
import { Dimmer, Loader, Icon, Pagination, Container, Transition, Item } from 'semantic-ui-react'

import { inject, observer } from 'mobx-react';

const paginationContainerStyles = {
  display: "flex",
  justifyContent: "center",
  position: "sticky",
  zIndex: "99999",
  bottom: "0",
}

const Events = ({ events, isLoading, totalPages, currentPage, getEvents }) => (
  <div >
    {isLoading &&
      <Container >
        <Dimmer active inverted style={{ position: 'fixed' }}>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      </Container>
    }
    <Transition animation="pulse" duration={500} visible={isLoading}>
      <Item.Group divided>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.name}
            uri={`/event/${event.id}`}
            logoUri={event.logo_uri}
            organizer={event.organizer && event.organizer.name}
            category={event.category && event.category.name}
            startTime={event.start_time}
            endTime={event.finish_time}
            minPrice={event.min_ticket_price}
            maxPrice={event.max_ticket_price}
            currency={event.ticket_price_currency}
          />
        ))}
      </Item.Group>
    </Transition>

    {!!events.length &&
      <Container style={paginationContainerStyles}>
        <Pagination
          defaultActivePage={currentPage + 1} // pagination starts with 1 but offset with 0;
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          totalPages={totalPages}
          onPageChange={(e, { activePage }) => getEvents(activePage - 1)} // same pagination and offset difference here
        />
      </Container>
    }

  </div>
);

@inject('EventStore')
@observer
class EventsContainer extends Component {
  componentDidMount() {
    this.props.EventStore.getEvents();
  }

  render() {
    const {
      events,
      isLoading,
      totalPages,
      currentPage,
    } = this.props.EventStore;

    return (
      <Events
        events={events}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        getEvents={this.props.EventStore.getEvents}
      />
    )
  }
}

export default EventsContainer;
