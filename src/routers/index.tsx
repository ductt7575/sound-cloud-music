import Title from 'antd/es/typography/Title'
import { Suspense } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import LayoutAdmin from '@/components/layout/LayoutAdmin'
import CommentsPage from '@/screens/comments.page'
import TracksPage from '@/screens/tracks.page'
import UsersPage from '@/screens/users.page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<LayoutAdmin />}
      errorElement={
        <Suspense>
          <div>Not Found Page</div>
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Title level={4}>Welcome to my admin app: User management</Title>
        }
      />

      <Route path="/users">
        <Route index element={<UsersPage />} />
      </Route>

      <Route path="/tracks">
        <Route index element={<TracksPage />} />
      </Route>

      <Route path="/comments">
        <Route index element={<CommentsPage />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_startTransition: true
    }
  }
)
