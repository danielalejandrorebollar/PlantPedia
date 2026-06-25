import { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { Typography } from '@ui/Typography'
import { VerticalTabs, TabItem } from '@ui/Tabs'
import { Alert } from '@ui/Alert'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { AuthorCard } from '@components/AuthorCard'
import ErrorPage from '../_error'

import { getAuthorList, QueryStatus } from '@api'
import { IGetPlantListByAuthorQueryVariables } from '@api/generated/graphql'
import { useRouter } from 'next/router'
// import shadows from '@material-ui/core/styles/shadows

type TopStoriesPageProps = {
  authors: Author[]
  currentAuthor: Author['handle']
  status: 'error' | 'success'
}

export const getServerSideProps: GetServerSideProps<TopStoriesPageProps> = async ({ params }) => {

    const authorHandle = String(params?.author)

    try {
      const authors = await getAuthorList({ limit: 10 })
      const doesAuthorExist = authors.some(
        (author) => author.handle === authorHandle
      )

      // Validates that the author exists and redirects to the first one in the list otherwise.
      if (authors.length > 0 && !doesAuthorExist) {
        const firstAuthor = authors[0].handle

        return {
          redirect: {
            destination: `/top-stories/${firstAuthor}`,
            permanent: false,
          },
        }
      }

      return {
        props: {
          authors,
          currentAuthor: authorHandle,
          status: 'success',
        },
      }
    } catch (e) {
      return {
        props: {
          authors: [],
          currentAuthor: authorHandle,
          status: 'error',
        },
      }
    }
  }

export default function TopStories({
  authors,
  
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  // const [currentTab, setCurrentTab] = useState(currentAuthor)
  const router = useRouter()
  
  const currentAuthor = router.query.author

  // if (typeof currentAuthor !== "string" || authors.length === 0 || status === 'error') {
  //   return (
  //     <Layout>
  //       <main className="pt-10 px-6">
  //         <div className="pb-16">
  //           <Typography variant="h2">Huh, algo no está bien 🙇‍♀️</Typography>
  //         </div>
  //         <article>
  //           <Alert severity="error">
  //             {status === 'error'
  //               ? 'Hubo un error consultando la información. Inspeccionar el request en la pestaña Network de DevTools podría dar más información'
  //               : 'No se encontró la información. ¿Olvidaste configurar el contenido en Contentful?'}
  //           </Alert>
  //         </article>
  //       </main>
  //     </Layout>
  //   )
  // }
  if(typeof currentAuthor !== "string" || authors.length === 0 || status === 'error'){
    return <ErrorPage message='something went wrong' statusCode={404}/>
  }

  const tabs: TabItem[] = authors.map((author) => ({
    content: <AuthorTopStories {...author} />,
    label: author.fullName,
    value: author.handle,
  }))

  return (
    <Layout>
      <main className="pt-10">
        <div className="text-center pb-16">
          <Typography variant="h2">Top 10 Stories</Typography>
        </div>
        <VerticalTabs
          tabs={tabs}
          currentTab={currentAuthor}
          onTabChange={(_, newValue) => router.push(`/top-stories/${newValue}`,undefined, { shallow: true })}
        />
      </main>
    </Layout>
  )
}

type AuthorTopStoriesProps = Author

function AuthorTopStories(author: AuthorTopStoriesProps) {
  const { data: plants, status } = usePlantListByAuthor({
    authorId: author.id,
    limit: 12,
  })
  return (
    <div>
      <section className="pb-16">
        <AuthorCard {...author} />
      </section>
      {status === 'error' ? (
        <Alert severity="error">Huh. Something went wrong.</Alert>
      ) : null}
      {status === 'success' && plants.length === 0 ? (
        <Alert severity="info">
          {author.fullName} doesn't have any story yet.
        </Alert>
      ) : null}
      <PlantCollection plants={plants} />
    </div>
  )
}

export const usePlantListByAuthor = (
  args: IGetPlantListByAuthorQueryVariables
) => {
  const [plantList, setPlantList] = useState<Plant[]>([])
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setStatus('loading')
    const request = async () => {
      try {
      const response = await fetch("/api/plantListByAuthor",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
          },
          body: JSON.stringify({ args }),
        });
        if(response.ok){
          const data = await response.json();
          const receivedPlants = data.props.plants;
          console.log(receivedPlants)
          setPlantList(receivedPlants)
          setStatus('success')
        }
        if(response.status == 500){
          const data = await response.json();
          const error = data.props.error;
          setError(error)
          setStatus('error')
        }
    
    

    } catch (e) {
        console.log("error en el usePlanListByAuthor",e)
      
    }
    }
    
    
    request()
  }, [])
  //   getPlantListByAuthor(args)
  //     .then((receivedPlants) => {
  //       setPlantList(receivedPlants)
  //       setStatus('success')
  //     })
  //     .catch((e) => {
  //       console.log("error en el usePlanListByAuthor",e)
  //       setError(e)
  //       setStatus('error')
  //     })
  // }, [])

  return {
    data: plantList,
    status, 
    error,
  }
}
