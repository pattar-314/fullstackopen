

export const logger = (req, res, next) => {
  console.log('url: ', req.url)
  console.log('method: ', req.method)
  console.log('body: ', req.body)
}