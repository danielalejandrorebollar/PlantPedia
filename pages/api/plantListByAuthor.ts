import { getPlantListByAuthor } from '@api/index';
import { IGetPlantListByAuthorQueryVariables } from '@api/generated/graphql'
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function  handler(req: NextApiRequest, res: NextApiResponse) {

  
  try {

    const args:IGetPlantListByAuthorQueryVariables  = req.body.args;
    const plants = await getPlantListByAuthor(args)

    return res.status(200).json({props: {plants}});

  } catch (error) {

    return res.status(500).json({
        props: {
          plants: [],
          status: 'error',
          error
    }})
  }
  
  
}
