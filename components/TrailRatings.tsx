import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel'

interface TrailRatingsProps {
  placeId: string // Google Places API Place ID
}

interface RatingData {
  averageRating: number
  totalReviews: number
  ratingsBreakdown: number[]
}

interface ReviewsData {
  author_name: string
  profile_photo_url: string
  relative_time_description: string
  text: string
}

const TrailRatings: React.FC<TrailRatingsProps> = ({ placeId }) => {
  const [ratingData, setRatingData] = useState<RatingData | null>(null)
  const [reviewsData, setReviewsData] = useState<ReviewsData[]>([])

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios(`/api/place-ratings?placeId=${placeId}`)

        const data = response.data.result
        if (data) {
          const ratingsBreakdown = Array(5).fill(0) // Array to store counts for 1★ to 5★
          data.reviews?.forEach((review: { rating: number }) => {
            const ratingIndex = 5 - Math.round(review.rating)
            if (ratingIndex >= 0 && ratingIndex < 5) {
              ratingsBreakdown[ratingIndex]++
            }
          })

          setRatingData({
            averageRating: data.rating || 0,
            totalReviews: data.user_ratings_total || 0,
            ratingsBreakdown,
          })
          setReviewsData(data.reviews || [])
          console.log(ratingData)
        }
      } catch (error) {
        console.error('Error fetching place details:', error)
      }
    }

    fetchPlaceDetails()
  }, [])

  if (!ratingData) {
    return <div>Loading...</div>
  }

  const { averageRating, totalReviews } = ratingData

  return (
    <div>
      <div
        className="flex flex-col items-center"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <h2>{averageRating.toFixed(1)}</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{
                color:
                  index < Math.round(averageRating) ? 'green' : 'lightgray',
                fontSize: '1.2rem',
              }}
            >
              ★
            </span>
          ))}
          <span style={{ marginLeft: '0.5rem', color: 'gray' }}>
            {totalReviews} reviews
          </span>
        </div>
      </div>
      <div className="flex w-[100%] justify-center">
        <div
          style={{
            position: 'relative',
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Carousel opts={{ align: 'center', loop: true }}>
            <CarouselContent>
              {reviewsData.map((review, index) => (
                <CarouselItem
                  className="flex flex-col align-center justify-center"
                  key={index}
                >
                  <img
                    src={review.profile_photo_url}
                    className="w-[50px] h-[50px] mb-5 rounded-full "
                    alt=""
                  />
                  <h3>{review.author_name}</h3>
                  <p>
                    {`${review.text.split(' ').slice(0, 50).join(' ')}${
                      review.text.split(' ').length > 50 ? '...' : ''
                    }`}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default TrailRatings
