import React, { useEffect, useState } from 'react'
import { postApi, albumApi, galleryApi } from '@/routes/api'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, style, className, ...rest } = props

  const [didError, setDidError] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src)

  const MAX_ATTEMPTS = 3

  useEffect(() => {
    setCurrentSrc(src)
    setDidError(false)
    setAttempts(0)
  }, [src])

  const handleLoad = () => {
    // reset on successful load
    setDidError(false)
    setIsRefreshing(false)
    setAttempts(0)
  }

  const handleError = async (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget
    console.error('Image load failed for', currentSrc)

    if (attempts >= MAX_ATTEMPTS) {
      console.error('Max image refresh attempts reached')
      setDidError(true)
      return
    }

    // Try to detect 403 by fetching the image URL
    try {
      const resp = await fetch(String(currentSrc), { method: 'GET', mode: 'cors', cache: 'no-store' })
      if (resp.status !== 403) {
        console.error('Image fetch returned non-403 status:', resp.status)
        setDidError(true)
        return
      }
    } catch (err) {
      console.error('Error while checking image status', err)
      setDidError(true)
      return
    }

    // At this point we saw a 403 — attempt to refresh
    const attr = (props as any)['data-post-id'] || (props as any)['dataPostId']
      ? { key: 'post', id: (props as any)['data-post-id'] || (props as any)['dataPostId'] }
      : (props as any)['data-gallery-id'] || (props as any)['dataGalleryId']
      ? { key: 'gallery', id: (props as any)['data-gallery-id'] || (props as any)['dataGalleryId'] }
      : img.getAttribute('data-album-id')
      ? { key: 'album', id: img.getAttribute('data-album-id') }
      : null

    if (!attr || !attr.id) {
      console.error('No data-post-id/data-gallery-id/data-album-id attribute found on image; cannot refresh')
      setDidError(true)
      return
    }

    setIsRefreshing(true)

    try {
      const delay = Math.pow(2, attempts) * 500
      await new Promise((r) => setTimeout(r, delay))

      let result: any
      if (attr.key === 'post') {
        result = await postApi.refreshImageUrl(attr.id)
      } else if (attr.key === 'gallery') {
        result = await galleryApi.refreshImageUrl(attr.id)
      } else if (attr.key === 'album') {
        result = await albumApi.refreshCoverImageUrl(attr.id)
      }

      const newUrl = result?.mediaUrl || result?.imageUrl || result?.coverImageUrl
      if (!newUrl) {
        throw new Error('Refresh endpoint did not return a usable URL')
      }

      console.info('Refreshed image URL for', attr.key, attr.id)
      setAttempts((a) => a + 1)
      setCurrentSrc(newUrl)
      // browser will automatically retry loading the updated src
    } catch (err) {
      console.error('Failed to refresh image URL for', attr?.key, attr?.id, err)
      setDidError(true)
      setIsRefreshing(false)
    }
  }

  if (didError) {
    return (
      <div className={`inline-block bg-[#F5F5F5] text-center align-middle ${className ?? ''}`} style={style}>
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative inline-block" style={{ width: '100%', height: '100%' }}>
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        style={style}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
        data-post-id={(props as any)['data-post-id'] || undefined}
      />
      {isRefreshing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            <span className="text-xs text-white">Refreshing...</span>
          </div>
        </div>
      )}
    </div>
  )}
