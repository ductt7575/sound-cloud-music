import { Form, Input, InputNumber, Modal, Select } from 'antd'
import { useEffect } from 'react'

import { User } from '@/types/user-management/user'

import useUser from './hooks/useUser'

const { Option } = Select
interface UpdateUserModalProps {
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: (v: boolean) => void
  dataUpdate: null | User
  setDataUpdate: React.Dispatch<React.SetStateAction<User | null>>
}

const UpdateUserModal = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  setDataUpdate
}: UpdateUserModalProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        age: dataUpdate.age,
        address: dataUpdate.address,
        role: dataUpdate.role,
        gender: dataUpdate.gender
      })
    }
  }, [dataUpdate, form])

  const handleCloseCreateModal = () => {
    setIsUpdateModalOpen(false)
    form.resetFields()
    setDataUpdate(null)
  }

  const { updateUserMutate } = useUser()

  const onFinish = async (values: Omit<User, '_id'>) => {
    const { name, email, age, gender, role, address } = values
    if (dataUpdate) {
      const data = {
        _id: dataUpdate._id,
        name,
        email,
        age,
        gender,
        role,
        address
      }

      try {
        await updateUserMutate(data)
        handleCloseCreateModal()
      } catch (err) {
        console.error('Error updating user:', err)
      }
    }
  }

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
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
          rules={[
            {
              required: dataUpdate ? false : true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password disabled={dataUpdate ? true : false} />
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

export default UpdateUserModal
