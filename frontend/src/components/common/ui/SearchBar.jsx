import React, { useState } from 'react';
import { 
  Box, 
  InputBase, 
  IconButton, 
  Paper,
  Popper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setAnchorEl(e.currentTarget);

    // Mock suggestions - replace with actual API call
    if (value.length > 0) {
      setSuggestions([
        'Moisturizer',
        'Face Cream',
        'Lipstick',
        'Eye Shadow'
      ].filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Box className="flex-grow max-w-xl mx-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          component="form"
          className="flex items-center px-4 py-1 shadow-sm hover:shadow-md transition-shadow duration-200"
          elevation={0}
        >
          <InputBase
            placeholder="Search products..."
            className="flex-grow ml-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <IconButton type="submit" className="text-gray-400 hover:text-primary-600">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Popper
          open={Boolean(suggestions.length)}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          className="w-full max-w-xl z-50"
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <Paper className="mt-1 shadow-lg">
                <List>
                  <AnimatePresence>
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ListItem 
                          button
                          className="hover:bg-gray-50"
                        >
                          <ListItemText>
                            <Typography variant="body2">
                              {suggestion}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </motion.div>
    </Box>
  );
};

export default SearchBar; 