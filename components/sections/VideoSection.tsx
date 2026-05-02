import VideoFacade from '@/components/VideoFacade'

export default function VideoSection() {
  return (
    <section style={{ backgroundColor: '#f4ece4', padding: '80px 0', width: '100%' }}>
      <div className="video-section-inner">
        <VideoFacade />
      </div>
    </section>
  )
}
