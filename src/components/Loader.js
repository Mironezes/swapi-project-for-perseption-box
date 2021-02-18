import Loader from 'react-loader-spinner'

export const Spinner = () => (
  <div className="loader">
    <Loader
      type="Circles"
      color="#FFE81F"
      height={100}
      width={100}
      timeout={3000} 
    />
  </div>

)
