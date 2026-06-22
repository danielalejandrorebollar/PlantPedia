import { NextApiHandler } from "next"

const previewStatus:NextApiHandler = (request, response) => {
  // console.log(response)
  // console.log(request.previewData)
  
  return  response.json({
    preview: request.preview ?? false,
    context: request.previewData,
  })
}

export default previewStatus