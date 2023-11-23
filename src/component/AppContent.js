import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

// routes config
import routes from '../routes'
import { Container } from 'react-bootstrap';

const AppContent = () => {
  return (
    <Container className='p-5'>
        <Suspense fallback={
            <Spinner animation="grow" />
        }>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="form_etatDeStock" replace />} />
        </Routes>
      </Suspense>
    </Container>
  )
}

export default React.memo(AppContent)
