import { Boomerang2Page } from './app.po';

describe('boomerang2 App', () => {
  let page: Boomerang2Page;

  beforeEach(() => {
    page = new Boomerang2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
