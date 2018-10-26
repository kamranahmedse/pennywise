import React from 'react';
import EmptyPage from './components/empty-page';
import NavBar from './components/nav-bar';
import WebPage from './components/web-page';

class Browser extends React.Component {
  state = {
    url: ''
  };

  onUrl = (url) => {
    this.setState({ url });
  };

  // noinspection JSMethodCanBeStatic
  renderEmptyPage() {
    return <EmptyPage onUrl={ this.onUrl }/>;
  }

  // noinspection JSMethodCanBeStatic
  renderWebPage() {
    return (
      <React.Fragment>
        <NavBar url={ this.state.url }/>
        <WebPage url={ this.state.url }/>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className='browser-wrap'>
        {
          this.state.url
            ? this.renderWebPage()
            : this.renderEmptyPage()
        }
      </div>
    );
  }
}

export default Browser;
