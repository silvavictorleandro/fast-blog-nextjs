import { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import Loading from "../../components/Loading";

const linkStyle = {
  fontSize: 16,
  fontWeight: 400,
  textDecoration: "none",
  color: "#FFFFFF",
};

/**
 * Renderizar condicionalmente o componente Loading baseado no estado isLoading
 *
 * Criar um state para posts, inicializá-lo com um array vazio: []
 *
 * Utilizar o useEffect para assim que a página carregar executar o método getPosts
 *
 * Renderizar lista de posts utilizando map, com título, data de criação e link para visualizar post
 */

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await fetch(
        "https://api.slingacademy.com/v1/sample-data/blog-posts"
      );
      const data = await response.json();
      setPosts(data.blogs)
      

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts()
  }, [])

  const getViewPostRoute = (post) => `/${post.id}/${encodeURI(post.title)}`;

  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  return (
    <Grid container rowGap={2} direction={"column"}>
      <Grid item>
        <Typography variant="h4">Publicações</Typography>
      </Grid>
      {isLoading && <Loading />}
      
      {/* início item post */}
      {posts.map((post) => 
        (<Grid key={post.id} item>
        <Link
          to={
            getViewPostRoute(post)
          }
          style={linkStyle}
        >
          <Typography align="left"> {post.title}</Typography>
        </Link>
        <Typography align="left" variant="caption">
          {formatPostDate(post.created_at)}
        </Typography>
      </Grid>)
      )}
      
      {/* fim item post */}
    </Grid>
  );
}
