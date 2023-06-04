const EMAIL_DOMAIN = [
  'qq.com',
  '163.com',
  'gmail.com',
  '126.com',
  'hotmail.com',
  '139.com',
  'sohu.com',
  'yahoo.com'
]

export const useEmail = (name: string, options: string[] = []) => {
  if (name.includes('@')) {
    return []
  }

  return EMAIL_DOMAIN
    .concat(options)
    .map((domain) => ({
      value: `${name}@${domain}`
    }))
}