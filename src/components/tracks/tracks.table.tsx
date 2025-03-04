import { useIsMutating } from '@tanstack/react-query'
import { Button, notification, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'

import { trackQueryKey } from '@/services/track'
import { Track } from '@/types/track-management/track'

import useTrack from './hooks/useTrack'

const TracksTable = () => {
  const [listUsers, setListUsers] = useState([])

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
      `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
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

  const { deleteTrackMutate } = useTrack()

  const isDeleting = !!useIsMutating({
    mutationKey: trackQueryKey.deleteTrack(),
    exact: true
  })

  const columns: ColumnsType<Track> = [
    {
      dataIndex: '_id',
      title: 'STT',
      render: (_value, _record, index) => {
        return <>{(meta.current - 1) * meta.pageSize + index + 1}</>
      }
    },

    {
      title: 'Title',
      dataIndex: 'title'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Track url',
      dataIndex: 'trackUrl'
    },
    {
      title: 'Uploader',
      dataIndex: ['uploader', 'name']
    },
    {
      title: 'Actions',
      render: (_value, record) => {
        return (
          <div>
            <Popconfirm
              title="Delete the user"
              description={`Are you sure to delete this track. name = ${record.title}?`}
              onConfirm={() => deleteTrackMutate({ id: record._id })}
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

  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`,
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

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Title level={4}>Table Tracks</Title>
      </div>

      <Table
        loading={isDeleting}
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
    </div>
  )
}

export default TracksTable
