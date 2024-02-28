import React, { useState } from "react";
import { Box, Button, Container, Heading, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";

const quizQuestions = {
  science: [
    {
      question: "What is the chemical symbol for the element oxygen?",
      answer: "O",
      options: ["O", "H", "N", "C"],
    },
    {
      question: "How many planets are in the Solar System?",
      answer: "8",
      options: ["7", "8", "9", "10"],
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      answer: "George Washington",
      options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
    },
    {
      question: "In what year did World War II end?",
      answer: "1945",
      options: ["1945", "1939", "1944", "1950"],
    },
  ],
};

const Index = () => {
  const [category, setCategory] = useState("");
  const [quiz, setQuiz] = useState(null);
  const toast = useToast();

  const generateQuestion = (category) => {
    if (!category) {
      toast({
        title: "Category not selected",
        description: "Please select a category to generate a question.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const questions = quizQuestions[category];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuiz(randomQuestion);
  };

  return (
    <Container>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        Quiz Generator
      </Heading>

      <RadioGroup onChange={setCategory} value={category}>
        <Stack direction="row" spacing={5} justify="center">
          <Radio value="science">Science</Radio>
          <Radio value="history">History</Radio>
        </Stack>
      </RadioGroup>

      <Box my={4} textAlign="center">
        <Button colorScheme="teal" onClick={() => generateQuestion(category)}>
          Generate Question
        </Button>
      </Box>

      {quiz && (
        <Box my={8} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            {quiz.question}
          </Text>
          <RadioGroup mt={4}>
            <Stack direction="column" spacing={3} justify="center">
              {quiz.options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Text mt={6} fontSize="2xl">
            Answer: {quiz.answer}
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default Index;
