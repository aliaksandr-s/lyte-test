import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { DateTime } from "luxon";
import { Icon, Image, Item } from 'semantic-ui-react'

const formatPrice = (val) => (
  Number(val).toFixed(2)
);

const isFree = (min, max) => (
  (Number(min) === 0) && (Number(max) === 0)
)

const Price = ({ min, max, cur }) => (
  <Item.Meta>
    {min && max && !isFree(min, max) &&
      <Fragment>
        <Icon disabled name='money bill alternate outline' color="green" />
        <span>{cur}</span>
        <span>{formatPrice(min)}</span>
        <span>-</span>
        <span>{formatPrice(max)}</span>
      </Fragment>
    }
    {min && max && isFree(min, max) &&
      <Fragment>
        <Icon disabled name='money bill alternate outline' color="green" />
        <span>Free</span>
      </Fragment>
    }
    {!min && !max &&
      <span>No price</span>
    }
  </Item.Meta>
)

const formatDate = (date) => DateTime.fromISO(date).toFormat('ff')

const DateComp = ({ start, end }) => (
  <Item.Meta>
    {start && end &&
      <Fragment>
        <Icon disabled name='calendar alternate outline'
          color="blue" />
        <span>{formatDate(start)}</span>
        <span>-</span>
        <span>{formatDate(end)}</span>
      </Fragment>
    }
    {!start && !end &&
      <span>No date</span>
    }
  </Item.Meta>
)

const PLACEHOLDER_URL = 'https://via.placeholder.com/300x120?text=No%20Image'

const ImgComp = ({ src }) => (
  <Fragment>
    {src &&
      <Item.Image size='medium' src={src} />
    }
    {!src &&
      <Image size='medium' src={PLACEHOLDER_URL} />
    }
  </Fragment>
)

const EventCard = ({
  id,
  title,
  uri,
  logoUri,
  organizer,
  category,
  startTime,
  endTime,
  minPrice,
  maxPrice,
  currency,
}) => (
    <Item key={id}>
      <ImgComp src={logoUri} />
      <Item.Content>
        <Item.Header as='a' href={uri}>{title}</Item.Header>

        <Item.Meta>
          <Icon disabled name='bullhorn'
            color="orange" />
          <span>{organizer}</span>
        </Item.Meta>

        {category &&
          <Item.Meta>
            <Icon disabled name='tag'
              color="purple" />
            <span>{category}</span>
          </Item.Meta>
        }

        <Price
          min={minPrice}
          max={maxPrice}
          cur={currency}
        />
        <DateComp
          start={startTime}
          end={endTime}
        />

      </Item.Content>
    </Item>
  )

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  logoUri: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  category: PropTypes.string,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  minPrice: PropTypes.string.isRequired,
  maxPrice: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  category: '',
};

export default EventCard