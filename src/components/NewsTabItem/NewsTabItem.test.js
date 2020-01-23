import React from 'react';
import renderer from 'react-test-renderer';
import NewsTabItem from './NewsTabItem';

describe('NewsTabItem', () => {
  const title = 'VAT ruling on Times digital edition could save News UK millions';
  const description = 'Rupert Murdoch’s firm satisfies tax tribunal that subscriptions should be zero-rated';
  const linkURL = 'https://www.theguardian.com/media/2020/jan/06/vat-ruling-on-times-digital-edition-could-save-news-uk-millions';

  it('Snapshot - Default', () => {
    const component = renderer.create(
      <NewsTabItem
        title={ title }
        description={ description }
        linkURL={ linkURL }
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});