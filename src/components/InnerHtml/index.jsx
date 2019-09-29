import React from 'react';
import PropTypes from 'prop-types';

import DOMPurify from 'dompurify';

const InnerHtml = ({ html, styles }) => (
  <div style={styles} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
)

InnerHtml.propTypes = {
  html: PropTypes.string.isRequired,
  styles: PropTypes.object
}

InnerHtml.defaultProps = {
  styles: {},
}

export default InnerHtml;