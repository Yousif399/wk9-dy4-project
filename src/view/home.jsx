import Card from 'react-bootstrap/Card';

const Home = () => {
  return (
    <div className='card'>

      <Card className="bg-dark text-white">
        <Card.Img src="https://wallpaperaccess.com/full/2720813.jpg" alt="Card image" />
        <Card.ImgOverlay className='d-flex flex-column justify-content-center'>
          <div className="container">
            <Card.Title className='display-2 fw-bolder mb-0'>Ride!</Card.Title>
            <Card.Text className='fs-2'>
              Welcome to My Bikes Shoppp
            </Card.Text>
          </div>

        </Card.ImgOverlay>
      </Card>


    </div>
  )
}

export default Home;