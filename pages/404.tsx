import React from 'react'
import { Button } from '@material-ui/core'
import {Typography} from '@material-ui/core'
import { Layout } from '@components/Layout'

const ErrorPage = () => {
  return (
      <Layout>
        <div className="text-center">404, my friendo</div>
        <div className="text-center">
          <Typography variant="h2" className="mb-6">
            🍂 We're sorry
          </Typography>
          <Typography variant="body1" className="mb-6">
            We couldn't find what you were looking for.
          </Typography>
          <Button
            color="primary"
            variant="contained"
            href="/"
            title="Go back home"
          >
            Back home
          </Button>
        </div>
      </Layout>
    )
}

export default ErrorPage
