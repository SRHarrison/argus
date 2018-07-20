import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import getLabel from 'utils/get-label';

const Styled = styled.div`
  margin: 0 20px;
`;

class PageHTML extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { html, page } = this.props;
    /* eslint-disable react/no-danger */
    return (
      <Styled>
        <Helmet>
          <title>{getLabel(`component.${page}.title`)}</title>
          <meta
            name="description"
            content={getLabel(`component.${page}.metaDescription`)}
          />
        </Helmet>
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </Styled>
    );
    /* eslint-enable react/no-danger */
  }
}

PageHTML.propTypes = {
  page: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

export default PageHTML;
