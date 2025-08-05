const STORAGE_CONFIG_KEY = 'milot_blog'

export const useLocalStorage = () => {
  const setConfig = (key = '', value = '') => {
    const storage = localStorage.getItem(STORAGE_CONFIG_KEY)
    const config = JSON.parse(storage || '{}')
    if (key) {
      config[key] = value
    }
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config))
  }

  const getConfig = (key = ''): string => {
    const storage = localStorage.getItem(STORAGE_CONFIG_KEY)
    const config = JSON.parse(storage || '{}')
    return config[key] || ''
  }

  return {
    setConfig,
    getConfig,
  }
}
