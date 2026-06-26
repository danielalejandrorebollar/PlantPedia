import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAuthorList, QueryStatus } from '@api'
import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'

type AuthorProps = {
  className?: string
}

export function Authors({ className }: AuthorProps) {
  const { data, status } = useAuthors()

  if (data == null || status !== 'success') {
    const dummyItems = Array.from({ length: 4 }, (_, i) => `item-${i}`)
    return (
      <Grid container spacing={4} className={className} justify="center">
        {dummyItems.map((item) => (
          <Grid
            xs={2}
            item
            key={item}
            className="bg-gray-200 animate pulse"
          ></Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={4} className={className} justify="center">
      {data.map(({ id, photo, fullName, handle }) => (
        <Grid item key={id}>
          <Link href={`/top-stories/${handle}`}>
            <a title={`See latest stories from ${fullName}`}>
              <img src={photo.url} width={150} />
              <Typography variant="h5" component="p" style={{textAlign:'center'}}>
                {fullName}
              </Typography>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

function useAuthors() {
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [data, setData] = useState<Author[] | null>(null)
  const [error, setError] = useState<Error[] | null>(null)

  // useEffect(
  //   () => {
  //     setStatus('loading')
  //     getAuthorList({ limit: 10 })
  //       .then((returnedData) => {
  //         setData(returnedData)
  //         setStatus('success')
  //       })
  //       .catch(() => setStatus('error'))
  //   },
  //   [
  //     // Run effect once
  //   ]
  // )

  // return {
  //   status,
  //   data,
  // }

  useEffect(() => {
      setStatus('loading')
      const request = async () => {
      try {
      const response = await fetch("/api/listAuthors");
        console.log(response)
        if(response.ok){
          const data = await response.json();
          const receivedAuthors = data.props.authors;
          console.log("autores desde Authors",receivedAuthors)
          setData(receivedAuthors)
          setStatus('success')
        }
        if(response.status == 500){
          const data = await response.json();
          const error = data.props.error;
          setStatus('error')
          setError(error)
        }
    
    

    } catch (e) {
        console.log("error en el usePlanListByAuthor",e)
      
    }
    }
    
    
    request()
    },
    [
      // Run effect once
    ]
  )

  return {
    status,
    data,
    error
  }
}
