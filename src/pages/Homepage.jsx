import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import "@fontsource/poppins"; // Import Google Font

// Define animations
const fadeInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-20px); }
  20% { opacity: 1; transform: translateX(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-20px); }
`;

const fadeInRight = keyframes`
  0% { opacity: 0; transform: translateX(20px); }
  20% { opacity: 1; transform: translateX(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateX(20px); }
`;

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [leftPrompts, setLeftPrompts] = useState([]);
  const [rightPrompts, setRightPrompts] = useState([]);
  const navigate = useNavigate();

  const examplePrompts = [
    "movies about artificial intelligence",
    "sci-fi films with emotional storytelling",
    "Oscar-winning dramas of the 2000s",
    "comedies about mistaken identity",
    "movies with strong female leads",
    "films set in post-apocalyptic worlds",
    "thrillers directed by David Fincher",
    "animated movies about friendship",
    "films involving time loops",
    "movies about space exploration",
    "romantic comedies with time travel",
    "classic mystery films with twists",
    "sports dramas based on true stories",
    "horror movies with psychological tension",
    "feel-good movies for weekends",
    "films about parallel universes",
    "family movies with adventure themes",
    "biographical movies of musicians",
    "movies like Inception",
    "films directed by Christopher Nolan",
  ];

  const handleSearch = () => {
    if (query.trim() === "") return;
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const generatePrompts = (side) => {
      const count = 2 + Math.floor(Math.random() * 2);
      const prompts = [];
      const usedPositions = [];

      for (let i = 0; i < count; i++) {
        const text =
          examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
        const randomHue = 90 + Math.random() * 60;

        let top;
        let tries = 0;
        do {
          top = Math.floor(Math.random() * 160);
          tries++;
        } while (
          usedPositions.some((p) => Math.abs(p - top) < 70) &&
          tries < 10
        );

        usedPositions.push(top);

        prompts.push({
          text,
          top: `${top}px`,
          color: `hsl(${randomHue}, 70%, 45%)`,
        });
      }

      if (side === "left") setLeftPrompts(prompts);
      else setRightPrompts(prompts);
    };

    generatePrompts("left");
    generatePrompts("right");

    const interval = setInterval(() => {
      generatePrompts("left");
      generatePrompts("right");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6b6d6eff 0%, #38393aff 50%, #000000ff 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Navbar />

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mt: 10,
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          color="white"
          gutterBottom
          sx={{ letterSpacing: "0.5px", fontFamily: "'Poppins', sans-serif" }}
        >
          Discover Movies by Meaning
        </Typography>

        <Typography
          variant="subtitle1"
          color="rgba(255,255,255,0.7)"
          gutterBottom
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Search for movies using plot, themes, directors, or natural language.
        </Typography>

        <Box
          sx={{
            mt: 8,
            mb: 10,
            width: "65%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Left Prompts */}
          <Box
            sx={{
              position: "absolute",
              left: "-220px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
              zIndex: 5,
            }}
          >
            {leftPrompts.map((p, i) => (
              <Chip
                key={i}
                label={p.text}
                sx={{
                  position: "relative",
                  top: p.top,
                  borderColor: p.color,
                  borderWidth: 2,
                  borderStyle: "solid",
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#000",
                  boxShadow: 2,
                  fontSize: "0.8rem",
                  fontFamily: "'Poppins', sans-serif",
                  animation: `${fadeInLeft} 3s ease-in-out infinite`,
                }}
                onClick={() => setQuery(p.text)}
              />
            ))}
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              bgcolor: "white",
              borderRadius: 5,
              boxShadow: "0px 4px 20px rgba(0, 100, 0, 0.5)",
              border: "3px solid #006400",
              p: 0.5,
              zIndex: 10,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Try searching: space travel movies with love theme..."
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              InputProps={{
                sx: {
                  borderRadius: 5,
                  backgroundColor: "rgba(255,255,255,0.95)",
                  fontFamily: "'Poppins', sans-serif",
                },
              }}
            />
            <IconButton color="success" sx={{ p: 1.5 }} onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Right Prompts */}
          <Box
            sx={{
              position: "absolute",
              right: "-220px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              zIndex: 5,
            }}
          >
            {rightPrompts.map((p, i) => (
              <Chip
                key={i}
                label={p.text}
                sx={{
                  position: "relative",
                  top: p.top,
                  borderColor: p.color,
                  borderWidth: 2,
                  borderStyle: "solid",
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#000",
                  boxShadow: 2,
                  fontSize: "0.8rem",
                  fontFamily: "'Poppins', sans-serif",
                  animation: `${fadeInRight} 3s ease-in-out infinite`,
                }}
                onClick={() => setQuery(p.text)}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;