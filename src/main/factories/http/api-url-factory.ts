export const makeApiUrl = (path: string): string => {
  return `${process.env.URL}${path}`
}
