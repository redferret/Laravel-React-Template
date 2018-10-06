
import Router from '../router.js';

const ROOT = '/root/test';
$('meta[name="rootURL"]').attr('content', ROOT);

test('Root is set after Router is created', () => {
  Router.root($('meta[name="rootURL"]').attr('content'));
  expect(Router._root).toBe(ROOT);
});
