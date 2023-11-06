const prefetchLog = (endpoint, body, ...rest) => {
  console.log('%c Starting API request:', 'background: #33AAFF; color: #FFF', {
    endpoint,
    body,
    rest,
  })
}

const postFetchSuccessLog = response => {
  console.log('%c Response:', 'background: #009944; color: #FFF', response)
}
const postFetchFailureLog = error => {
  console.log('%c Response:', 'background: #DD0000; color: #FFF', error)
}

export { prefetchLog, postFetchFailureLog, postFetchSuccessLog }
