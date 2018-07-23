import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import getLabel from 'utils/get-label';

import Label from 'components/Label';

const Styled = styled.div`
  margin: 0 20px;
`;

const key = 'glossary';

class PageGlossary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { terms } = this.props;
    return (
      <Styled>
        <Helmet>
          <title>{getLabel(`component.${key}.title`)}</title>
          <meta
            name="description"
            content={getLabel(`component.${key}.metaDescription`)}
          />
        </Helmet>
        <h2 id="pageTitle">
          <Label id={`component.${key}.title`} />
        </h2>
        <div>
          {
            Object.keys(terms).map((termId) =>
              (
                <div key={termId}>
                  <h3>{terms[termId].name}</h3>
                  <p>
                    {terms[termId].full}
                  </p>
                </div>
              )
            )
          }
        </div>
      </Styled>
    );
  }
}

PageGlossary.propTypes = {
  terms: PropTypes.object.isRequired,
};

export default PageGlossary;
