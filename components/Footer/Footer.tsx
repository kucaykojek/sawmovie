export default function Footer() {
  return (
    <footer className="footer p-4 bg-primary-alt text-secondary text-center text-sm">
      <div className="container">
        <span>&copy; 2023 - Asep Fajar Nugraha.</span>
        <br />
        Movie API by{' '}
        <a href="https://themoviedb.org" className="underline" target="_blank">
          TMDB
        </a>
        , Hero Background by{' '}
        <a
          href="https://www.pexels.com/id-id/foto/kursi-teater-merah-dekat-pilar-beton-putih-269140"
          className="underline"
          target="_blank"
        >
          Pixabay
        </a>
      </div>
    </footer>
  )
}
