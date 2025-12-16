const API_BASE_URL = import.meta.env.__API_BASE_URL__

const getCommonHeaders = () => {
  const token = localStorage.getItem('TOKEN')
  const headers: any = {}
  if (token) {
    headers['Authorization'] = token
  }
  return headers
}

export const addSession = async (params: { username: string; password: string }) => {
  try {
    const response = await fetch(API_BASE_URL + '/session', {
      method: 'PUT',
      body: JSON.stringify(params)
    })

    if (response.status >= 400) {
      throw new Error(response.status + '')
    }

    const data = await response.json()
    return data
  } catch (error) {
    alert(error)
    throw error
  }
}

export const getSessionStatus = async () => {
  const response = await fetch(API_BASE_URL + '/session', {
    headers: getCommonHeaders(),
    mode: 'cors'
  })

  if (response.status >= 400) {
    throw new Error(response.status + '')
  }

  const data = await response.json()

  return data.valid
}

export const deleteSession = async () => {
  const response = await fetch(API_BASE_URL + '/session', {
    method: 'DELETE',
    headers: getCommonHeaders(),
    mode: 'cors'
  })

  if (response.status >= 400) {
    throw new Error(response.status + '')
  }
}

namespace SDI {}

type PageQuery = {
  keyword: string
  number: number
  size: number
  sort: string
  order: string
  startAt: string
  endAt: string
}

type PageResult = {
  query: PageQuery // 1. 应当返回完整 2. 应当返回准确的数据
  list: unknown[]
  total: number
}

// 获取文章分页数据
export const getArticleAll = async (query?: unknown) => {
  const response = await fetch(API_BASE_URL + '/articles', {
    method: 'GET',
    mode: 'cors'
  })

  if (response.status >= 400) {
    throw new Error(response.status + '')
  }

  const list = await response.json()

  return list
}

export const addArticle = async (payload: unknown) => {
  await fetch(API_BASE_URL + '/articles', {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: getCommonHeaders()
  })
}

export const getArticle = async (id: number | string) => {
  const response = await fetch(API_BASE_URL + `/articles/${id}`, {
    mode: 'cors'
  })

  if (response.status >= 400) {
    throw new Error(response.status + '')
  }
  const data = await response.json()

  return data
}

export const updateArticle = async (id: number, payload: unknown) => {
  await fetch(API_BASE_URL + '/articles/' + id, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: getCommonHeaders()
  })
}

export const removeArticle = async (id: number | string) => {
  const response = await fetch(API_BASE_URL + `/articles/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: getCommonHeaders()
  })

  if (response.status >= 400) {
    throw new Error(response.status + '')
  }
}
