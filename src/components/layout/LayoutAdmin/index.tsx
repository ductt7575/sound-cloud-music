import Title from 'antd/es/typography/Title'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import QueryProvider from '@/providers/QueryProvider/QueryProvider'

import Header from '../Header'
import useLogin from './hooks/useLogin'

const LayoutAdmin = () => {
  const { loginMutate } = useLogin()

  const getData = async () => {
    try {
      const result = await loginMutate({
        username: 'hoidanit@gmail.com',
        password: '123456'
      })
      if (result) {
        localStorage.setItem('access_token', result.data.access_token)
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryProvider>
      <Title level={3}>Admin - Management</Title>
      <Header />
      <Outlet />
    </QueryProvider>
  )
}

export default LayoutAdmin
