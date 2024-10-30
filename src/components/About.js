import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../shared/Footer";

const faqData = [
  {
    question: "What is PulseWire?",
    answer:
      "PulseWire is a platform that provides the latest news headlines from various categories to keep you informed and updated.",
  },
  {
    question: "How frequently is the news updated?",
    answer:
      "The news is updated in real-time as new articles become available. You can always find the latest headlines here.",
  },
  {
    question: "Can I suggest a news source?",
    answer:
      "Yes, we are always open to suggestions for new news sources. Please contact us with your recommendations.",
  },
  {
    question: "Is PulseWire free to use?",
    answer:
      "Yes, PulseWire is completely free to use. We provide the latest news headlines at no cost to our users.",
  },
];

const About = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ my: 5, marginTop: 12 ,minHeight:"76vh"}}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          About PulseWire
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#555" }}>
          Welcome to PulseWire! We aim to provide you with the most up-to-date
          news headlines from around the world. Our platform aggregates news
          from various sources to ensure that you stay informed about current
          events.
        </Typography>
        <Box sx={{ mt: 4, mb: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold",  }}
          >
            Frequently Asked Questions
          </Typography>
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`panel${index}-header`}
                sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#ffffff" }}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Divider sx={{ my: 4, borderColor: "#ddd" }} />
        <Typography variant="body1" paragraph sx={{ color: "#555" }}>
          For any other questions or support, feel free to contact us at
          <a
            href="mailto:support@PulseWire.com"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            &nbsp;support@PulseWire.com
          </a>
          .
        </Typography>
      </Container>
      <div style={{ width: "100%" }}>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default About;
