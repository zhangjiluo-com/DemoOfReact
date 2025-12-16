import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { addSession, getSessionStatus } from '@/services'

export const useSessionStore = defineStore('session', () => {
  const state = reactive({
    isLoggedIn: false
  })

  const login = async (params: { username: string; password: string }) => {
    const result = await addSession(params)
    state.isLoggedIn = true
    localStorage.setItem('TOKEN', result.token)
  }

  const checkSession = async () => {
    const result = await getSessionStatus()
    if (result) {
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
    return result
  }

  const logout = async () => {
    localStorage.removeItem('TOKEN')
    state.isLoggedIn = false
  }

  return {
    state,
    login,
    checkSession,
    logout
  }
})
