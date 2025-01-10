import {
  AudioOutlined,
  BookOutlined,
  FireOutlined,
  TeamOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <FireOutlined />
  },
  {
    label: <Link to="/users">Manage Users</Link>,
    key: 'users',
    icon: <TeamOutlined />
  },
  {
    label: <Link to="/tracks">Manage Tracks</Link>,
    key: 'tracks',
    icon: <AudioOutlined />
  },
  {
    label: <Link to="/comments">Manage Comments</Link>,
    key: 'comments',
    icon: <BookOutlined />
  }
]

const Header = () => {
  const [current, setCurrent] = useState('')

  const location = useLocation()

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  useEffect(() => {
    const currentTab = location.pathname.replace('/', '')
    if (currentTab === '') {
      setCurrent('home')
      return
    }
    setCurrent(currentTab)
  }, [location.pathname])

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}
export default Header
