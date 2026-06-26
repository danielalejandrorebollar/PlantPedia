import React from 'react'
import { Layout } from '@components/Layout'
import { Typography } from '@material-ui/core'

import { Button } from '@material-ui/core'
import { NextPage } from 'next'
import NotFound from './404'
import ServerError from './500'

type ErrorPageProps = {
  statusCode?: number
  message: string
}


const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  console.log("statusCode desde _error",statusCode)
  if (statusCode === 404){
    return <NotFound />
  }

  if(typeof statusCode === 'number' && statusCode > 500){
    return <ServerError message={message} statusCode={statusCode}/>
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode
      ? `An error ${statusCode} occurred on server`
      : 'An error occurred on client'
  }

  return (
    <Layout>
      <div className="text-center">{errorMessage}</div>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🦦 Doh!
        </Typography>
        <Typography variant="body1" className="mb-6">
          {errorMessage}
        </Typography>
        {!statusCode ? null : (
          <Typography variant="body1" className="mb-6">
            <span className="bg-gray-300 inline-block">
              ERRORCODE: {statusCode}
            </span>
          </Typography>
        )}
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
ErrorPage.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500
  console.log(res, err)
  return {statusCode, message:err?.message ?? 'Unexpected Error'}
}

export default ErrorPage