import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import { Link } from 'react-router-dom';
import { Container, Tab, Row, Col, CardDeck, Card, Button } from 'react-bootstrap';
import './Shablon-style.css';


export default function MainPage() {

  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "post"]{
        description,
        slug,
        properties,
        comments,
        idtovary,
        dopovnennya,
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        },
      }`)
      .then((data) => {setPost(data); console.log(data);})    
      .catch(console.error);
  }, []);

  if(!postData) {
    return (
      <div><span className="error-style">Завантаження... або щось пішло не так</span></div>
    );
  };

  return (
    <>
    <Container className=" mb-3 d-flex flex-wrap">
         <Tab.Container id="left-tabs-example" defaultActiveKey="Clock">
           <Row>
             {postData && postData.map((post, index) => (
               <Col key={index} sm={12} md={8} lg={6}  className="plitka-collapse-content mt-3 style-cards">
               <span key={index} > 

             <Tab.Content>
                <Tab.Pane eventKey="Clock">
                  <CardDeck>
                    <Card className="cards-animation" border="0" >
                    <Link to={"/post" + post.slug.current} key={post.slug.current}>
                      <Card.Img 
                        variant="top" 
                        src={post.mainImage.asset.url}
                        height={350}
                        className="height-image-mobile"
                        />
                      </Link>
                      <Card.Body className="cards-background">
                            <Card.Text>
                              <strong>description: </strong><span className="card-fonts">{post.description}</span> 
                              <br/><strong>properties: </strong><span className="card-fonts">{post.properties}</span>
                              <br/><strong>comments: </strong><span className="card-fonts">{post.comments}</span>
                              <div className="button-space">
                                <span className="button-space">
                                  <Button
                                    className="ml-2"
                                    variant="warning"
                                    onClick={event =>  window.location.href='https://testissue.sanity.studio/'}
                                  >Edit</Button>
                                </span>
                                <span>
                                  <Link to={"/post" + post.slug.current} key={post.slug.current}>
                                    <Button 
                                      variant="primary"
                                      src={post.mainImage.asset.url}
                                    >Seel post</Button>
                                    </Link>
                                </span>
                              </div>
                            </Card.Text>
                      </Card.Body>
                    </Card>                  
                  </CardDeck>
                </Tab.Pane>
              </Tab.Content>

              </span>
            </Col>
              ))}
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}