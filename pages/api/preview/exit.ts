import { NextApiHandler } from "next"

const exitPreview:NextApiHandler = (_, response) => {

  //Exit the current user from "Preview Mode"
  response.clearPreviewData()

  response.redirect('/')
  response.end()

}

export default exitPreview