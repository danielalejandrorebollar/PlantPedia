import { useCallback } from 'react'
import NextImage, { 
  ImageLoaderProps,
  ImageProps as NextImageProps
} from 'next/image'

type ImageLayout = "fill" | "fixed" | "intrinsic" | "responsive"
type AspectRatio =  "16:9" | "1:1" | "4:3" | "3:2" | "9:12" | "6:12" | "18:24"
type ImageFit = "fill" | "pad" | "scale"  | "crop" | "thumb" 

type DistributiveOmit<T, K extends keyof any> = T extends unknown 
  ? Omit<T, K> 
  : never;

type ImageProps = {
  layout: ImageLayout
  src: string
  width: number
  height?: never
  aspectRatio: AspectRatio
  fit?: ImageFit
} & DistributiveOmit<NextImageProps, 'height'>

export function Image ({ layout, src, width, aspectRatio, fit = 'scale'}: ImageProps){


  const height = calcAspectRatio(aspectRatio, width)
  
  const imageLoader =  useCallback(
      (loaderArgs: ImageLoaderProps):string => {
      const loaderHeight = calcAspectRatio(aspectRatio, loaderArgs.width)
      return `${loaderArgs.src}?w=${loaderHeight}&fit=${fit}&h=${loaderHeight}`
    },[aspectRatio,fit]
  )
  
  return <NextImage  
    layout={layout} 
    src={src} 
    width={width}  
    loader={imageLoader} 
    height={height}/>
}

const aspectRatioToRatio: Record<AspectRatio,number> = {
  '1:1': 1,
  '4:3': 3 / 4,
  '16:9': 9 / 16,
  '3:2': 2 / 3,
  '9:12': 12 / 9,
  '6:12': 12 / 6,
  '18:24': 24 / 18,
}
function calcAspectRatio(aspectRatio: AspectRatio, width:number): number{
  const ratio = aspectRatioToRatio[aspectRatio]
  return Math.floor(ratio * width)
}