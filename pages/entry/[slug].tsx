import { getCategoryList, getPlant, getPlantList, QueryStatus } from '@api/index'
import { AuthorCard } from '@components/AuthorCard'
import { Layout } from '@components/Layout'
import { RichText } from '@components/RichText'
import { Grid, Link, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PlantEntryInline } from '@components/PlantCollection'

//2 Que paginas re renderizar sucde una vez en build time

type PathType = {
    params:{
        slug:string
    }
}

export const getStaticPaths = async () =>{
    
    const entries = await getPlantList({limit : 20})

    const paths: PathType[] = entries.map(plant=>({
        params:{
            slug:plant.slug
        }
    }))

    return {
        paths,
        //404 en entradas no encontrardas
        fallback: false
    }
}

// 1. Como alimentar las pagina


type PlantEntryProps = {
        plant?: Plant
        categories?: Category[],
        otherEntries: Plant[]
        
}

export const getStaticProps : GetStaticProps<PlantEntryProps> = async ({ params }) =>{
    const slug = params?.slug
    if(typeof slug !== 'string' ){
        return {
            notFound: true //lo que nos permite nextjs tambien podemos hacer redirect
        }
    }

    try {
        const plant = await getPlant(slug)
        const otherEntries = await getPlantList({limit: 5})
        const categories = await getCategoryList({limit:6})
        console.log(categories)
        return {
            props: {
                plant,
                categories,
                otherEntries
            }
        }
    } catch (e) {
        return {
            notFound: true //lo que nos permite nextjs tambien podemos hacer redirect
        }
    }
}


const PlantEntryPage = ({plant, categories, otherEntries}:InferGetStaticPropsType<typeof getStaticProps >) => {
    // const [status,setStatus] = useState<QueryStatus>('idle')
    // const [plant, setPlant] = useState<Plant | null>(null)
    const router = useRouter()
    const slug = router.query.slug

    console.log(slug)
    
    // useEffect(()=>{
    //     if(typeof slug !== 'string'){
    //         setStatus('error')
    //         return 
    // }

    //     setStatus('loading')
    //     getPlant(slug).then(receivedData=>{
    //         setPlant(receivedData)
    //         setStatus('success')
    //     }).catch(()=>
    //         setStatus('error')
    //     )

    // },[])


// if( status === 'loading' || status ==='idle'){
//     return (
//         <Layout>
//             <main>
//                 Loading awesomeness..
//             </main>
//         </Layout>
//     )
// }


if(plant === undefined ){
    return (
        <Layout>
            <main>404 not found</main>
        </Layout>
        
    )
}

    return (
        <Layout >
            <Grid container style={{ width: "90%", margin: "0 auto" }}  spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        {plant.author.fullName}
                        <img src={plant.image.url} alt={plant.image.title} />
                    </figure>
                    <div className='px-12 pt-8'>
                        <Typography variant="h2">
                            {plant.plantName}
                        </Typography>
                    </div>
                    <div className='px-12 pt-8'>
                        <RichText richText={plant.description}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            RecentPosts
                            {otherEntries.map(plantEntry=>(
                            <article style={{marginBottom:"3px"}} id={plantEntry.id}>
                                <PlantEntryInline  className="fontSize:16px "    {...plantEntry}/>
                            </article>

                            ))}
                        </Typography>

                    </section>
                    <section className='mt-10'>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                            {categories?.map(category=>(
                                <li style={{listStyle:"none", marginLeft:"20px"}} key={category.id}>
                                    <Link href={`/category/${category.slug}`}>
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </Typography>
                    </section>
                </Grid>
            </Grid>
            <section className='my-4 border-t-2 border-b-2 border-gray-200'>
                <AuthorCard {...plant.author} />

            </section>
    </Layout>   
    
    )
}

export default PlantEntryPage