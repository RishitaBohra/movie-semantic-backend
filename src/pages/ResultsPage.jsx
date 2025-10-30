import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from "../components/navbar";
import "@fontsource/poppins";

const ResultsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [graphOpen, setGraphOpen] = useState(false);

  const query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await fetch("http://10.80.19.26:8000/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, top_k: 5 }),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const truncatePlot = (plot, charLimit = 200) => {
    if (!plot) return "";
    if (plot.length <= charLimit) return plot;
    return plot.slice(0, charLimit) + "…";
  };

  const toggleExpand = (index) => {
    setExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const openGraph = () => {
    setGraphOpen(true);
  };

  const closeGraph = () => {
    setGraphOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6b6d6eff 0%, #38393aff 50%, #000000ff 100%)",
      }}
    >
      <Navbar />

      <Container sx={{ py: 6, color: "white" }}>
        {/* Heading + Knowledge Graph Button */}
        <Box sx={{
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  mb: 4
}}>
  <Typography
    variant="h3"
    sx={{
      fontWeight: 700,
      fontSize: {
        xs: "1rem",
        sm: "2.5rem",
        md: "1.5rem"
      },
      letterSpacing: "1.5px",
      fontFamily: "'Inter', sans-serif",
      color: "#E6E6E6"
    }}
    gutterBottom
  >
    Results for “{query}”
  </Typography>

  <Button
    variant="outlined"
    sx={{
      color: "white",
      borderColor: "white",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: {
        xs: "0.9rem",
        sm: "1rem"
      }
    }}
    onClick={openGraph}
  >
    View Knowledge Graph
  </Button>
</Box>


        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress color="success" />
          </Box>
        ) : error ? (
          <Typography color="error" mt={4}>
            {error}
          </Typography>
        ) : movies.length === 0 ? (
          <Typography color="rgba(255,255,255,0.7)" mt={4}>
            No results found.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
            {movies.map((movie, index) => {
              const isExpanded = expanded[index];
              const displayPlot = isExpanded ? movie.plot : truncatePlot(movie.plot);

              return (
                <Card
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    bgcolor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                    p: 2,
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {movie.title ?? "Unknown Title"} ({movie.release_year ?? "N/A"})
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      🎬 <strong>Director:</strong> {movie.director ?? "N/A"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      🎭 <strong>Genre:</strong> {movie.genre ?? "N/A"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      👥 <strong>Cast:</strong> {movie.cast ?? "N/A"}
                    </Typography>

                    <Box sx={{ mt: 1, display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <DescriptionIcon sx={{ fontSize: "1.2rem", color: "#00a000", mt: "2px" }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {displayPlot}
                      </Typography>
                    </Box>

                    {movie.plot && movie.plot.length > 200 && (
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                        <Button
                          size="small"
                          sx={{
                            textTransform: "none",
                            color: "#d3d8d3ff",
                          }}
                          onClick={() => toggleExpand(index)}
                        >
                          {isExpanded ? "Show less" : "Read more"}
                        </Button>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ flexShrink: 0, mr: 2 }}>
                    {movie.wiki_page && (
                      <Button
                        href={movie.wiki_page}
                        target="_blank"
                        variant="contained"
                        sx={{
                          bgcolor: "#006400",
                          "&:hover": { bgcolor: "#004d00" },
                          borderRadius: 2,
                          mr: 2
                        }}
                      >
                        View More
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      {/* Knowledge Graph Dialog */}
      <Dialog
        open={graphOpen}
        onClose={closeGraph}
        fullWidth
        maxWidth="lg"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.6)"
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
          Knowledge Graph
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ fontFamily: "'Inter', sans-serif" }} gutterBottom>
            Graph data will appear here for your query: <strong>{query}</strong>
          </Typography>
          {/* later: fetch and render the graph */}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeGraph}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsPage;