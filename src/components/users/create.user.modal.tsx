import { Form, Input, InputNumber, Modal, notification, Select } from 'antd'

import { UserUpsertParams } from '@/services/user/types'

import useUser from './hooks/useUser'

const { Option } = Select

interface CreateUserModalProps {
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (v: boolean) => void
}

const CreateUserModal = ({
  isCreateModalOpen,
  setIsCreateModalOpen
}: CreateUserModalProps) => {
  const [form] = Form.useForm()

  const handleCloseCreateModal = () => {
    form.resetFields()
    setIsCreateModalOpen(false)
  }
  const { createUserMutate } = useUser()

  const onFinish = async (values: UserUpsertParams) => {
    try {
      await createUserMutate(values)
      handleCloseCreateModal()
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Failed to create user. Please try again.'
      })
      console.error(err)
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
