import React from 'react';
import PropTypes from 'prop-types';
import cssStyles from './NewsTabItem.module.scss';

const NewsTabItem = ({ title, description, linkURL }) => {
  return (
    <article className={ cssStyles.layout }>
      <h4><a href={ linkURL } target="_blank" rel="noopener noreferrer">{ title }</a></h4>
      <p>{ description }</p>
    </article>
  );
};

NewsTabItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

NewsTabItem.defaultProps = {
  title: '',
  description: ''
};

export default NewsTabItem;