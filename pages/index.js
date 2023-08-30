// Create a text area with the following specifications:
// 1. a H1 with the text "Find Nutrition Facts for any recipe"
// 2. a text area for users to upload recipe
// 3. a button for users to submit the entered recipe
// 4. a section at the bottom to display nutrition facts
// 5. Get the data from this link: http://localhost:8080/openai/generateinfo
// 6. Name the component RecipeInfo

import React, { useState } from 'react';
import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextareaAutosize,
    Typography,
  } from "@material-ui/core";
  import { Send } from "@material-ui/icons";
  import { ThemeProvider } from "@material-ui/core/styles";
  import Header from "../components/Header";
  import NutritionFacts from "../components/NutritionFacts";
  import Footer from "../components/Footer";
  import theme from "../utils/theme";

  function HomePage() {
    const [recipe, setRecipe] = useState("");
    const [nutrition, setNutrition] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/openai/generateinfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipe }),
        }
      );

      // get nutrition info
      const nutrition = await response.json();

      // display nutrition info
      if (nutrition.data) {
        console.log(nutrition);
        setNutrition(nutrition.data);
        setLoading(false);
      } else {
        setError("Unable to get nutrition info");
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  function handleClear(event) {
    event.preventDefault();
    setRecipe("");
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="md" style={{ marginTop: "40px", minHeight: "100vh", paddingBottom: "100px" }}>
        <Typography variant="h3" gutterBottom>
          🍎 Find Nutrition Facts for any recipe
        </Typography>
        <Paper elevation={24} style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextareaAutosize
                  value={recipe}
                  onChange={(e) => setRecipe(e.target.value)}
                  placeholder="Enter recipe to get nutrition facts"
                  style={{
                    width: "98%",
                    maxWidth: "850px",
                    minHeight: "200px",
                    padding: "10px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                >
                  Submit
                </Button>
                <br />
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <div style={{ paddingTop: "40px" }}>
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {error ? (
            <Typography color="error">
              An error occurred: {error.errorMessage}
            </Typography>
          ) : nutrition ? (
            <NutritionFacts data={nutrition} />
          ) : null}
        </div>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default HomePage;