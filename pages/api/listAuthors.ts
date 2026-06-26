import { getAuthorList } from '@api/index';
import type {  NextApiRequest,NextApiResponse } from 'next';


export default async function  handler(req:NextApiRequest,  res: NextApiResponse) {

  
  try {

    const authors  = await getAuthorList({ limit: 10 })
    
    return res.status(200).json({props: {authors}});

  } catch (error) {

    return res.status(500).json({
        props: {
          authors: [],
          status: 'error',
          error
    }})
  }
  
  
}
