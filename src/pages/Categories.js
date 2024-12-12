import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useReports } from "../api/ReportsContext";

function Categories() {
  const { filteredReports } = useReports();

  const getCategoryCounts = (filteredReports) => {
    const counts = {};
    filteredReports.forEach((report) => {
      counts[report.category] = (counts[report.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts(filteredReports);

  const categoryColors = {
    todo: "#4caf50",
    Reminders: "#2196f3",
    Projects: "#ff9800",
    Ideas: "#9c27b0",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={["10px", "30px", "30px"]}
      mt="30px"
    >
      <Text fontSize="2xl" mb={4}>
        Categories
      </Text>
      {Object.entries(categoryCounts).map(([category, count]) => (
        <Box
          key={category}
          display="flex"
          alignItems="center"
          p={3}
          mb={2}
          borderRadius="8px"
          backgroundColor={categoryColors[category] || "#ddd"}
          color="white"
        >
          <Text flex={1} fontSize="lg">
            {category}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {count}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default Categories;
