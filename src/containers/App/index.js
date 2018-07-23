import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LiveAnnouncer, LiveMessage } from 'react-aria-live';
import styled from 'styled-components';

import getLabel from 'utils/get-label';

import PageMap from 'containers/PageMap';
import Label from 'components/Label';
import Header from 'components/Header';
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

const Intro = styled.div`
  z-index: 1001;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform: translate(50%,0);
`;

const IntroContent = styled.div`
  background-color: rgba(255,255,255,0.8);
  width: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 20px;
  transform: translate(-50%, 0);
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
    /* eslint-disable react/no-danger */
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
          <main
            role="main"
            ref={this.main}
            tabIndex="-1"
            aria-labelledby="pageTitle"
          >
            <Content>
              { this.state.intro &&
                <Intro>
                  <IntroContent>
                    <span dangerouslySetInnerHTML={{ __html: intro }} />
                    <button onClick={() => this.dismiss()} >Explore</button>
                  </IntroContent>
                </Intro>
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
    /* eslint-enable react/no-danger */
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
