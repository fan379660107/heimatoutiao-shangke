class Storage {
  set(key, value) {
    // 判断是否是一个对象 是的话JSON.stringify
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 如果parse 的是一个JSON格式字符串 ，return JSON.parse
    // 如果不是 则直接返回 防止报错
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()

export default storage
