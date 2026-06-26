import React from 'react'
import { Button } from '@material-ui/core'
import {Typography} from '@material-ui/core'
import { Layout } from '@components/Layout'


const ErrorPage = ({statusCode,message}:{statusCode:number,message?:string}) => {
  console.log(message)
  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍄 Something went wrong {statusCode}
        </Typography>
        <Typography variant="body1" className="mb-6">
          Mensaje de Error:{message}
        </Typography>
        <Typography variant="body1" className="mb-6">
          It's not you, it's us. Please try it again in a few minutes.
        </Typography>
        <Typography variant="body1" className="mb-6">
          <span className="bg-gray-300 inline-block">ERRORCODE: 505</span>
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title="Go back home"
        >
          Go back home
        </Button>
      </div>
    </Layout>
    )
}

export default ErrorPage
