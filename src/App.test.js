import React from 'react';
import renderer from 'react-test-renderer';
import { render, wait } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { default as ukNews } from '../fixtures/uk-news';
import App from './App';

test('Application snapshot', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Given a page with a tabbed component, it', () => {

  it('should render the page title', () => {
    const { getByText } = render(<App />);
    const appTitle = getByText(/Tabbed Component/i);
    expect(appTitle).toBeInTheDocument();
  });

  describe('When displaying a list of UK news items, it', () => {
    let serverMock;
    let newsUrl;

    beforeEach(() => {
      serverMock = new MockAdapter(axios);
      // https://content.guardianapis.com/search?show-fields=trailText&q=uk-news&api-key=9wur7sdh84azzazdt3ye54k4
      newsUrl = /content\.guardianapis\.com\/search\?/i;
      serverMock.onGet(newsUrl).reply(200, ukNews);
    });

    afterEach(() => {
      serverMock.restore();
    });

    it('should include a tab item', () => {
      const { getByText } = render(<App />);
      const tabTitle = getByText(/UK News/i);
      expect(tabTitle).toBeInTheDocument();
    });

    it('should include a tab content',  async () => {
      expect.assertions(1);

      const { container } = render(<App/>);
      await wait(() => {
        const tabContent = container.getElementsByTagName('article');
        expect(tabContent.length).toBeGreaterThan(5);
      });
    });

  });

});
