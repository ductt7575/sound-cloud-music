import { Form, Input, InputNumber, Modal, notification, Select } from 'antd'

import { User } from '@/types/user-management/user'

const { Option } = Select

interface CreateUserModalProps {
  access_token: string
  getData: () => Promise<void>
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (v: boolean) => void
}

const CreateUserModal = ({
  access_token,
  getData,
  isCreateModalOpen,
  setIsCreateModalOpen
}: CreateUserModalProps) => {
  const [form] = Form.useForm()

  const handleCloseCreateModal = () => {
    form.resetFields()
    setIsCreateModalOpen(false)
  }

  const onFinish = async (values: Omit<User, '_id'>) => {
    console.log('Success:', values)
    const { name, email, password, age, gender, role, address } = values

    const data = { name, email, password, age, gender, role, address }
    const res = await fetch('http://localhost:8000/api/v1/users', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const d = await res.json()
    if (d.data) {
      await getData()
      notification.success({
        message: 'Tạo mới user thành công.'
      })
      handleCloseCreateModal()
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: JSON.stringify(d.message)
      })
    }
  }

  return (
    <Modal
      title="Add new user"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="MALE">male</Option>
            <Option value="FEMALE">female</Option>
            <Option value="OTHER">other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          name="role"
          label="Role"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="USER">User</Option>
            <Option value="ADMIN">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
