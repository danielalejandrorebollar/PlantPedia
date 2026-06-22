import { Button } from '@material-ui/core'
import { Alert } from '@ui/Alert'
import {useEffect, useState} from 'react'

type PreviewStatusResponse = {
  preview: boolean,
  context: Json,
} | null

const PreviewModeBanner = () => {
  const [isEnabled,setIsEnabled] = useState(false)
  
  useEffect(()=>{
    try {
      fetch('/api/preview/status')
        .then(response=>response.json())
          .then((data:PreviewStatusResponse)=>{
            setIsEnabled(data?.preview || false)
          })
    } catch (e) {
      
    }
    
  },[])
  
  if(!isEnabled){
      return null
    }

  return (
    <div className='fixed right-0 bottom-16 w-md transform translate'>
      <Alert
        variant='filled'
        severity='warning'
        action={
          <Button variant='text' color="inherit" href='/api/preview/exit'>
            Disable preview mode
          </Button>
        }
      >
        <div className='max-w-md'>Preview Mode is Enabled</div>
      </Alert>
    </div>
  )
}

export default PreviewModeBanner