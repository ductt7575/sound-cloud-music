import { PlusOutlined } from '@ant-design/icons'
import { Button, notification, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'

import { User } from '@/types/user-management/user'

import CreateUserModal from './create.user.modal'
import useUser from './hooks/useUser'
import UpdateUserModal from './update.user.modal'

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const [dataUpdate, setDataUpdate] = useState<null | User>(null)

  const access_token = localStorage.getItem('access_token') as string

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const d = await res.json()
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message)
      })
    }
    setListUsers(d.data.result)
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total
    })
  }

  const { deleteUserMutate } = useUser()

  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const d = await res.json()
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message)
      })
    }
    setListUsers(d.data.result)
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total
    })
  }

  const columns: ColumnsType<User> = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_value, record) => {
        return <div>{record.email}</div>
      }
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Role',
      dataIndex: 'role'
    },
    {
      title: 'Actions',
      render: (_value, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                setDataUpdate(record)
                setIsUpdateModalOpen(true)
              }}
              type="default"
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete the user"
              description={`Are you sure to delete this user. name = ${record.name}?`}
              onConfirm={() => deleteUserMutate({ id: record._id })}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: 20 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={4}>Table Users</Title>

        <div>
          <Button
            icon={<PlusOutlined />}
            type={'primary'}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={listUsers}
        rowKey={'_id'}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true
        }}
      />

      <CreateUserModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateUserModal
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  )
}

export default UsersTable
