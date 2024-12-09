import { Box, Button, Input, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import { Avatar } from "../components/ui/avatar";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useReports } from "../api/ReportsContext"; 


function Notes() {
  const { reports, loading, error, updateReport, deleteReport, filteredReports } = useReports(); 
  const [editingContent, setEditingContent] = useState({}); 

  const handleEdit = (id, updatedData) => {
    updateReport(id, updatedData); 
    setEditingContent((prev) => ({ ...prev, [id]: "" })); 
  };

  const handleDelete = (id) => {
    deleteReport(id); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const style = {
        boxSizing: "border-box",
        border: "1px solid none",
        padding: "30px 10px 30px 10px",
        width: "100%",
      };


  return (
    <Box style={style} display="flex" flexWrap="wrap" gap="10px">
      { filteredReports && filteredReports.map((report) => (
        <Card.Root width={["100%", '50%', '24%']} mb="20px" padding="10px" key={report.id}>
          <Card.Body gap="2">
            <Avatar src={report.image} name="Nue Camp" size="lg" shape="rounded" />
            <Card.Title mt="2">{report.title}</Card.Title>
            <Card.Description>{report.report}</Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <PopoverRoot position='relative'>
              <PopoverTrigger asChild>
                <MdOutlineEdit size="25px" style={{ cursor: "pointer" }} />
              </PopoverTrigger>
              <PopoverContent padding="10px"
                position="absolute"
                zIndex="1000"
                style={{
                  top: "100%",
                  left: 0,
                  width: "100%",
                }}>
                <PopoverArrow />
                <PopoverBody>
                  <PopoverTitle fontWeight="medium">Edit Report</PopoverTitle>
                  <Input
                    placeholder="Edit your report"
                    value={editingContent[report.id] || ""}
                    onChange={(e) =>
                      setEditingContent((prev) => ({
                        ...prev,
                        [report.id]: e.target.value,
                      }))
                    }
                    size="sm"
                  />
                  <Button
                    size="sm"
                    mt="4"
                    colorScheme="blue"
                    background='#c692fb'
                    width='50px'
                    onClick={() =>
                      handleEdit(report.id, { report: editingContent[report.id] })
                    }
                  >
                    Save
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
            <RiDeleteBin4Line
              size="25px"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(report.id)}
            />
          </Card.Footer>
        </Card.Root>
      ))}
    </Box>
  );
}

export default Notes;
