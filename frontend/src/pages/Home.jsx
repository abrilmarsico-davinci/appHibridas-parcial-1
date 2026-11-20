import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { moviesAPI, genresAPI } from '../services/apiService';
import '../styles/home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, genresRes] = await Promise.all([
          moviesAPI.getAll(),
          genresAPI.getAll()
        ]);
        setMovies(moviesRes.data.data);
        setGenres(genresRes.data.data);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">
        <h1>Películas App</h1>
        <div className="navbar-right">
          <span>Hola, {user?.name || user?.email}</span>
          <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </header>

      <main className="content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <section>
              <h2>Géneros ({genres.length})</h2>
              <div className="list">
                {genres.map((genre) => (
                  <div key={genre._id} className="item">
                    <h3>{genre.name}</h3>
                    <p>{genre.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Películas ({movies.length})</h2>
              <div className="list">
                {movies.map((movie) => (
                  <div key={movie._id} className="item">
                    <h3>{movie.title}</h3>
                    <p>Director: {movie.director}</p>
                    <p>Año: {movie.releaseYear}</p>
                    <p>Rating: {movie.rating}/10</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
