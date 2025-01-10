import Title from 'antd/es/typography/Title'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

const LayoutAdmin = () => {
  const getData = async () => {
    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'hoidanit@gmail.com',
        password: '123456'
      })
    })

    const d = await res.json()
    if (d.data) {
      localStorage.setItem('access_token', d.data.access_token)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Title level={3}>Admin - Management</Title>
      <Header />
      <Outlet />
    </div>
  )
}

export default LayoutAdmin
