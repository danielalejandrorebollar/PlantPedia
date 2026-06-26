import { getCategoryList, getPlant, getPlantList } from '@api/index'
import { AuthorCard } from '@components/AuthorCard'
import { Layout } from '@components/Layout'
import { RichText } from '@components/RichText'
import { Grid, Link, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { PlantEntryInline } from '@components/PlantCollection'
import {flatMap} from 'lodash' 
import NotFound from  '../500'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


//2 Que paginas re renderizar sucde una vez en build time

type PathType = {
    params:{
        slug:string
    }
    locale: string
}

export const getStaticPaths: GetStaticPaths = async ({locales}) =>{
    if(locales === undefined){
        throw Error("you do not defined locales en nextconfig")
    }
    const plantEntriesToGenerate = await getPlantList({limit : 20})

    const paths: PathType[] = flatMap(plantEntriesToGenerate.map(plant=>({
        params:{
            slug:plant.slug
        }
    })),(path)=>locales.map(loc => ({locale: loc, ...path })));


    // const nuevo =  paths.map(plant=> plant.params.slug)
    // console.log("linea 29", nuevo)

    // const plantEntriesFromFS = fs.readFileSync(path.join(process.cwd(), 'paths.txt'), 'utf-8').toString()
    // const plantEntriestoGenereate = plantEntriesFromFS.replace(/'/g, "").split(/,\r?\n/)
    // console.log("linea 32", plantEntriestoGenereate)

    // const paths: PathType[] = plantEntriestoGenereate.map(plant=>({
    //         params:{
    //             slug:plant
    //         }
    //     }))
// console.log(paths)




    return {
        paths,
        //404 en entradas no encontrardas fallback: false
        // fallback blocking si no esta prerenderizada tiene que ir a buscarla al servidor y prerenderizarla
        // fallback tre nos da la oportunidad de mostrar estados de loading
        fallback: true
    }
}

// 1. Como alimentar las pagina


type PlantEntryProps = {
        plant?: Plant,
        categories?: Category[],
        otherEntries?: Plant[],
        notFound?: boolean
        
}

export const getStaticProps : GetStaticProps<PlantEntryProps> = async ({ params, preview , locale }) =>{
    
    const slug = params?.slug

    const i18nConf = await serverSideTranslations(locale! , ['common'])

    if(typeof slug !== 'string'  ){
        return {
            notFound: true //lo que nos permite nextjs tambien podemos hacer redirect
        }
    }
    // console.log("linea 79", typeof locale, locale, preview)
    if(locale === undefined){
        throw Error("you do not defined locales en nextconfig") 
    }

    try {
    
        const plant = await getPlant(slug, preview, locale)
        const otherEntries = await getPlantList({limit: 5})
        const categories = await getCategoryList({limit:6})
        // console.log(categories)
        return {
            props: {
                plant,
                categories,
                otherEntries,
                ...i18nConf,
            },
            revalidate: 5 * 60,
        }
    } catch (e) {
        return {
            props:{
                notFound: true
            }
            // notFound: true //lo que nos permite nextjs tambien podemos hacer redirect
        }
    }
}


const PlantEntryPage = ({
    plant,
    categories,
    otherEntries,
    notFound
}:InferGetStaticPropsType<typeof getStaticProps >) => {

    // const [status,setStatus] = useState<QueryStatus>('idle')
    // const [plant, setPlant] = useState<Plant | null>(null)
    const router = useRouter()
    
    if(router.isFallback){
        return (
            <Layout>
                Cargando...
            </Layout>
        )
    }
    // const slug = router.query.slug

    // console.log(slug)
    
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


if(notFound === true || plant === undefined ){
    return (
        <NotFound message='No se encontró' statusCode={500}/>
        
    )
}

    return (
        <Layout >
            <Grid container style={{ width: "90%", margin: "0 auto" }}  spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        {plant?.author.fullName}
                        <img src={plant?.image.url} alt={plant?.image.title} />
                    </figure>
                    <div className='px-12 pt-8'>
                        <Typography variant="h2">
                            {plant?.plantName}
                        </Typography>
                    </div>
                    <div className='px-12 pt-8'>
                        <RichText richText={plant?.description}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            RecentPosts
                            {otherEntries?.map(plantEntry=>(
                            <article key={plantEntry.id} style={{marginBottom:"3px"}} id={plantEntry.id}>
                                <PlantEntryInline  className="fontSize:16px "    {...plantEntry}/>
                            </article>

                            ))}
                        </Typography>

                    </section>
                    <section className='mt-10'>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                            {categories?.map(category=>(
                                <li key={category.id} style={{listStyle:"none", marginLeft:"20px"}} >
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
                <AuthorCard {...plant?.author} />

            </section>
    </Layout>   
    
    )
}

export default PlantEntryPage