import { GetStaticProps, InferGetStaticPropsType } from 'next'
// import { Grid } from '@ui/Grid'
// import { Button } from '@ui/Button'
// import { Typography } from '@ui/Typography'
// import { useState } from 'react'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { getPlantList } from '@api'
import { Authors } from '@components/Authors'
import { Hero } from '@components/Hero'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import NotFound from  './500'


type HomeProps = {
  plants?: Plant[],
  notFound?: boolean
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({locale}) =>{

  try {
    const plants = await getPlantList({ limit: 20, locale})
    // console.log("Plantas en getStaticProps de Index general",plants)
    const i18nConf = await serverSideTranslations(locale! , ['common'])
    // console.log(i18nConf)
    // const authors = await getAuthorList({limit:5})
    return {
      props:{
        plants, 
        ...i18nConf
      },
      revalidate:  5,
    }
    
  } catch (error) {
    console.log("estes es el error en getStaticProps",error)
    return {
      props:{
        notFound:true
      }
    }
  }

}


export default function Home({plants, notFound}: InferGetStaticPropsType<typeof getStaticProps>) {
    // const [data, setData] = useState<Plant[]>([])
  
    // useEffect(()=>{
    //     // fetchPlants()
    //     // .then(response => response.json())
    //     // .then(data=>console.log(data))

    //     // getPlantList({limit:20}).then(receivedData =>{
    //     //   receivedData.forEach( item => console.log(item.author.fullName))
    //     // })
    //     const call = async () => {
    //     const receivedData = await getPlantList({limit: 20})
    //     setData(receivedData)
    //     //response.forEach((item,index)=>console.log(index+1,item.author.fullName))
    // }
    // call()
    
    // },[])

    // console.log("Plantas",plants)
    // console.log("NotFound",notFound)
    if(notFound === true || plants === undefined ){
        return (
            <NotFound statusCode={500}/>
            
        )
    }

    return (

    <Layout>
        <Hero {...plants[0]} className='mb-20' />
        <Authors  className='mb-20' />
        <PlantCollection
          plants={plants.slice(1,3)}
          variant='pair'
          className='mb-20'
        />
        <PlantCollection
          plants={plants.slice(3,8)}
          variant='square'
          className='mb-20'
        />
        <PlantCollection
          plants={plants.length > 9 ? plants.slice(10,20) : plants}
          variant='vertical'
          className='mb-20'
        />
    </Layout>
    )

    {/* {data.map((item,index)=>(
        <div>
            <h1>{item.plantName}</h1>
            <img src={item.image.url}  />
        </div>
    ))} */}
    
    
}


