import { getPlant } from '@api/index'
import { NextApiHandler } from 'next'

const enablePreview:NextApiHandler = async (request, response) => {
  // const router = useRouter()
  // console.log(router.isPreview)
  const slug = request.query.slug
  // check the secret an next parameters
  // this secrect should only be known to this api route and the 

  if(request.query.secret !== process.env.PREVIEW_SECRET || typeof slug !== 'string' || slug==''){
    return response.status(401).json({message: 'Invalid Token'})
  }

  try {
    //fetch the headless CMS to check if the provided 'slug '
    const plant = await getPlant(slug,true)

    //Enable Preview Mode by setting the cookies
    
    response.setPreviewData({})
    
    //Redirect to the path from the fetched plant
    //We don't redirect to request.query.slug as that might lead

    response.redirect(`/entry/${plant.slug}`)

  } catch (error) {
    if(process.env.NODE_ENV !== 'production'){
      console.log(error)
    }
    return response.status(401).json({message:'Invalid slug'})
  }
}

export default enablePreview