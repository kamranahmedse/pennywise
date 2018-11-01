const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Application launch', function () {
  this.timeout(1000000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
    });
  });

  it('shows the empty page on load', function () {
    return this.app.client.getText('.empty-page h1')
      .then((text) => {
        assert.equal(text, 'Pennywise');
      });
  });

  it('should change opacity', function () {
    return this.app.client.setValue('.empty-page input', 'https://github.com/kamranahmedse/pennywise')
    .then((ok) => {
      return this.app.client.keys('Enter');
    })
    .then((ok) => {
      return this.app.client.waitForExist('.settings-btn', 5000)
    })
    .then((ok) => {
      return this.app.client.click('.settings-btn button', 5000)
    })
    .then((ok) => {
      return this.app.client.waitForExist('.opacity-picker', 5000)
    })
    .then((ok) => {
      return this.app.client.click('input#opacity-picker')
    })
    .then((ok) => {
      return this.app.client.keys('Left arrow').then(ok => delay(500))
    })
    .then((ok) => {
      return this.app.browserWindow.getOpacity();
    })
    .then((opacity) => {
      assert(opacity < 1);
    })
  });

  it('should load url', function () {
    return this.app.client.setValue('.empty-page input', 'https://github.com/kamranahmedse/pennywise')
      .then((ok) => {
        return this.app.client.keys('Enter');
      })
      .then((ok) => {
        return this.app.client.waitForExist('div.top-nav', 5000)
      })
      .then((ok) => {
        // check for loader:start
        return this.app.client.waitUntil(() => {
          return this.app.client.getTagName('#nprogress').then(tag => {
            return tag !== 'div';
          })
        }, 50000, 'Expected Loader')
      }).catch(err => {
        // check for loader:end
        assert.equal(err.type, 'WaitUntilTimeoutError');
      })
  });
});
