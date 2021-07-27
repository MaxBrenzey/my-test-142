import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import './Shablon-style.css';


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
  return builder.image(source)
}



export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      description,
      slug,
      properties,
      comments,
      mainImage{
      asset->{
        _id,
        url
        }
      },
      body,
      "name": author->name,
      "authorImage": author->image
    }`).then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if(!singlePost) {
    return (
      <div><span className="error-style">Завантаження... або щось пішло не так</span></div>
    );
  };

  return (
    <>
    <Container className="card-center">
      <Card className="single-post-card" border="0">
        <Card.Img 
          variant="top" 
          src={singlePost.mainImage.asset.url}
          height="auto"
        />
        <Card.Body>
          <Card.Text>
            <strong>description: </strong><span className="card-fonts">{singlePost.description}</span> 
            <br/><strong>properties: </strong><span className="card-fonts">{singlePost.properties}</span>
            <br/><strong>comments: </strong><span className="card-fonts">{singlePost.comments}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container> 

    </>
  )
}
