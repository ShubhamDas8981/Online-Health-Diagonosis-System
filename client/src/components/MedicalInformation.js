import React, { useState, useEffect } from 'react';
import NavbarNew from './NavbarNew';
import axios from 'axios';
import { Input, Button, Box, List, ListItem, Text, Spinner } from "@chakra-ui/react";

const formattty = (tty) => {
    const ttyMap = {
        SCD: 'clinical drug', GPCK: 'Clinical pack', SBD: 'Branded drug', BPCK: 'Branded pack'
    };
    const newtty = ttyMap[tty];
    return `${newtty}`;
};

const MedicinalInformation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSpellingSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSpellingSuggestions = async () => {
    setSuggestionLoading(true);
    try {
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchTerm}`
      );
      setSuggestions(response.data.suggestionGroup.suggestionList.suggestion || []);
    } catch (err) {
      setSuggestions([]);
    }
    setSuggestionLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setDrugData(null);
    try {
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchTerm}`
      );
      setDrugData(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box>
    <NavbarNew/>
      <div className='container' style={{marginTop:"30px",padding:"30px",backgroundColor:"white", borderRadius:"20px"}}>
      <h1 style={{textAlign:"center"}}>Drug Details</h1>
      <h6 style={{marginBottom:"20px"}}>Get the drug products associated with a specified name. The name can be an ingredient, brand name, clinical dose form, branded dose form, clinical drug component, or branded drug component.</h6><hr></hr>
        <Input
          placeholder="Enter drug name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={2}
        />
        {suggestionLoading ? (
          <Spinner size="sm" />
        ) : (
          suggestions.length > 0 && (
            <List spacing={2} mt={2}>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  onClick={() => setSearchTerm(suggestion)}
                  cursor="pointer"
                  
                  _hover={{ bg: "gray.200" }}
                >
                  {suggestion}
                </ListItem>
              ))}
            </List>
          )
        )}
        <Button color="white" bg="teal.500" _hover={{ bg: "teal.600" }}  onClick={handleSearch} mt={2}>
          Search
        </Button>
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">{error}</Text>}
        {drugData && drugData.drugGroup && drugData.drugGroup.conceptGroup ? (
          <List spacing={3} mt={4}>
            {drugData.drugGroup.conceptGroup.map((group) => {
              const ttynew = formattty(group.tty);
              return (
                <Box key={group.tty} borderWidth="1px" borderRadius="lg"  _hover={{ bg: "blue.100" }} p={4} mt={2}>
                  <Text fontWeight="bold">{ttynew} ({group.tty})</Text>
                  {group.conceptProperties && group.conceptProperties.map((property) => (
                    <ListItem key={property.rxcui}>
                      <Text>
                        {property.name} ({property.synonym})
                      </Text>
                    </ListItem>
                  ))}
                </Box>
              );
            })}
          </List>
        ) : (
          <Text>No data available</Text>
        )}
      </div>
    </Box>
  );
};

export default MedicinalInformation;



