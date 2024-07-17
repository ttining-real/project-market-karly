export default function getQueryParams() {
  let params = {};
  window.location.search.replace(/^\?/, '').split('&').forEach(function(param) {
      let parts = param.split('=');
      params[parts[0]] = parts[1];
  });
  return params;
}