import Link from 'next/link'
import { Grid, GridProps } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { Image } from '@components/Image'

import { Excerpt } from '@components/Excerpt'

type PlantCollectionProps = {
  plants: Plant[]
  variant?: 'square' | 'vertical' | 'pair'
  className?: string
}

export function PlantCollection({
  plants,
  variant,
  className,
}: PlantCollectionProps) {
  return (
    <Grid container component="ul" spacing={4}  className={className} justify="center" style={{
    maxWidth: 1200,
    margin: '0 auto'
  }}>
      {plants.map((plant) => (
        <PlantEntry key={plant.id} plant={plant} variant={variant} />
      ))}
    </Grid>
  )
}

type PlantEntryType = {
  plant: Plant
  variant?: 'square' | 'vertical' | 'pair'
}

export function PlantEntry({ plant, variant = 'square' }: PlantEntryType) {
  let gridItemProps: GridProps = { xs: 8, sm: 5, md: 4 }
  let Component: (props: Plant) => JSX.Element = PlantEntrySquare

  if (variant === 'vertical') {
    Component = PlantEntryVertical
    gridItemProps = {
      xs: 12,
      sm: 6,
    }
  }
  else if (variant === 'pair') {
    Component = PlantEntryPair
    gridItemProps = {
      xs: 12,
      sm: 6,
    }
  }

  return (
    <Grid key={plant.id} role="listitem" item {...gridItemProps}>
      <Component {...plant} />
    </Grid>
  )
}



export function PlantEntrySquare({ image, plantName, slug }: Plant) {
  return (
    <Link href={`/entry/${slug}`}>
      <a title={`Go to ${plantName}`}>
        <div className="opacity-95 hover:opacity-100">
          {/* <img src={image.url} width={460} />   */}
          <Image 
            src={image.url} 
            width={800} 
            layout="responsive" 
            aspectRatio='16:9' 
            fit='scale'
          />
          <div className="p-4">
            <Typography variant="h4" className="break-words">
              {plantName}
            </Typography> 
          </div>
        </div>
      </a>
    </Link>
  )
}
export function PlantEntryPair({ image, plantName, slug }: Plant) {
  return (
    <Link href={`/entry/${slug}`}>
      <a title={`Go to ${plantName}`}>
        <div className="opacity-95 hover:opacity-100">
          {/* <img src={image.url} width={460} />   */}
          <Image 
            src={image.url} 
            width={600} 
            layout="intrinsic" 
            aspectRatio='18:24' 
            fit='fill'
          />
          <div className="p-4">
            <Typography variant="h4" className="break-words">
              {plantName}
            </Typography> 
          </div>
        </div>
      </a>
    </Link>
  )
}

export function PlantEntryInline({
  image,
  plantName,
  slug,
  className,
}: Plant & { className?: string }) {
  return (
    <Link prefetch={false} href={`/entry/${slug}`}>
      <a title={`Go to ${plantName}`}>
        <div
          className={`opacity-95 hover:opacity-100 flex items-end ${className} w-80`}
        >
          <Image 
            
            src={image.url} 
            width={84} 
            layout="responsive" 
            aspectRatio='1:1' 
            fit='scale'
          />
          <img src={image.url} width={84} className="flex-none" />
          <div className="pl-2 flex-auto" >
            <Typography  className="break-words text-[8px] overflow-hidden  text-ellipsis">
              {plantName}
            </Typography>
          </div>
        </div>
      </a>
    </Link>
  )
}



export function PlantEntryVertical({
  image,
  plantName,
  description,
  slug,
}: Plant) {
  return (
    <div className="opacity-95 hover:opacity-100">
      <Link href={`/entry/${slug}`}>
        <a title={`Go to ${plantName}`}>
          {/* <img src={image.url} width={624} /> */}
          <Image 
            src={image.url} 
            width={624} 
            layout="responsive"  
            aspectRatio='16:9' 
            fit='scale'
          />
          <Typography variant="h2" className="break-words pt-4 px-4">
            {plantName}
          </Typography>
        </a>
      </Link>
      <div className="px-4 pb-4">
        <Excerpt
          richText={description}
          color="textSecondary"
          className="py-6"
        />
        <Link href={`/entry/${slug}`} passHref>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  )
}
