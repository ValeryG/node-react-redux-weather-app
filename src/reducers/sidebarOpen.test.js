import SidebarReducer from './sidebarOpen';

describe('Cities reducer', () => {
  it('should return initial state if action is not supported', () => {
    expect(SidebarReducer(undefined, {type: 'hi!'})).toEqual(false);
  });
  it('should toggle sidebar status to false if true', () => {
    expect(SidebarReducer(true, {type: 'TOGGLE_SIDEBAR'})).toEqual(false);
  });
  it('should toggle sidebar status to true if false', () => {
    expect(SidebarReducer(false, {type: 'TOGGLE_SIDEBAR'})).toEqual(true);
  });
});
