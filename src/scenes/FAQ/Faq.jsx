import React, { useState } from "react";
import { Box, useTheme, Button, Checkbox } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";

const FAQ = () => { 
  const posts =[
    {
      id: 1,
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      question: "Why do we use it?",
      answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 3,
      question: "Where does it come from?",
      answer: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
      id: 4,
      question: "Where can I get some?",
      answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const handleTogglePost = (postId) => {
    const selectedIndex = selectedPosts.indexOf(postId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedPosts, postId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedPosts.slice(1));
    } else if (selectedIndex === selectedPosts.length - 1) {
      newSelected = newSelected.concat(selectedPosts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedPosts.slice(0, selectedIndex),
        selectedPosts.slice(selectedIndex + 1)
      );
    }

    setSelectedPosts(newSelected);
  };

  const handleSelectAllClick = () => {
    if (selectedPosts.length === 0) {
      setSelectedPosts(posts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleDeleteSelectedPosts = () => {
    // Logic to delete selected posts
    console.log("Deleting selected posts:", selectedPosts);
  };

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelectedPosts}
        >
          Delete Selected Posts
        </Button>
      </Box>

      {posts.map((post) => (
        <Accordion
          key={post.id}
          defaultExpanded
          onChange={() => handleTogglePost(post.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox
              color="primary"
              checked={selectedPosts.indexOf(post.id) !== -1}
              onChange={() => handleTogglePost(post.id)}
            />
            <Typography color={colors.greenAccent[500]} variant="h5">
              {post.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{post.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
