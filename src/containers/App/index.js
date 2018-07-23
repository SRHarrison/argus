import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import getLabel from 'utils/get-label';

import PageMap from 'containers/PageMap';
import Label from 'components/Label';
import Header from 'components/Header';
import Intro from 'components/Intro';
import SkipContent from 'styles/SkipContent';

import intro from 'pages/intro.md'; // loaded as HTML from markdown

import { selectAnnouncement } from 'containers/App/selectors';
import { NAVITEMS, DATA } from './constants';
import { loadData } from './actions';

const Content = styled.div`
  position: absolute;
  left: 80px;
  top: 0;
  bottom: 0;
  right: 0;
`;

const ContentOverlay = styled(Content)`
  z-index: 1002;
  background: #fff;
`;

/**
 *
 * @return {Component} react base component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.main = React.createRef();
    this.state = {
      windowWidth: window.innerWidth,
      intro: true,
    };
  }
  componentDidMount() {
    this.focus();
    this.props.loadData();
  }
  componentDidUpdate() {
    this.focus();
  }
  focus() {
    // Explicitly focus the app container
    // Note: we're accessing "current" to get the DOM node
    this.container.current.focus();
  }

  skipToContent() {
    this.main.current.focus();
  }
  dismiss() {
    this.setState({ intro: false });
  }

  render() {
    const { component, announcement } = this.props;
    return (
      <div
        tabIndex="-1"
        aria-labelledby="pageTitle"
        ref={this.container}
      >
        <LiveAnnouncer>
          <LiveMessage message={announcement} aria-live="polite" />
          <SkipContent
            onClick={() => this.skipToContent()}
            title={getLabel('screenreader.skipToContent')}
          >
            <Label id="screenreader.skipToContent" />
          </SkipContent>
          <Header navItems={NAVITEMS} />
          <Helmet>
            <title>{getLabel('app.title')}</title>
            <meta
              name="description"
              content={getLabel('app.metaDescription')}
            />
          </Helmet>
          <main
            role="main"
            ref={this.main}
            tabIndex="-1"
            aria-labelledby="pageTitle"
          >
            <Content>
              { this.state.intro &&
                <Intro dismiss={() => this.dismiss()} html={intro} />
              }
              <PageMap />
            </Content>
            { component &&
              <ContentOverlay>
                { component }
              </ContentOverlay>
            }
          </main>
        </LiveAnnouncer>
      </div>
    );
  }
}

App.propTypes = {
  component: PropTypes.element,
  announcement: PropTypes.string,
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  announcement: selectAnnouncement(state),
});

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => {
      Object.keys(DATA).forEach((key) => dispatch(loadData(key, DATA[key])));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
