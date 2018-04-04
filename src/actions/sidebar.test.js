import * as SidebarActions from './sidebar';

describe('sidebar actions', () => {
  it('should create an action with type ADD_CITY', () => {
    expect(SidebarActions.toggle()).toEqual({
      type: 'TOGGLE_SIDEBAR'
    });
  });
});
